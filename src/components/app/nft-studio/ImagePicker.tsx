import { MediaPicker } from "degen"
import { useState } from "react";
import Image from "next/image"
import { cn } from "@/utils/cn";


export function ImagePicker({setImage}:any) {

    const [imageBlob, setImageBlob] = useState<string>('');
    const [isHover, setIsHover] = useState<boolean>(false);
    const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) =>
        event.target?.result instanceof ArrayBuffer ? resolve(event.target.result) : reject(new Error('Invalid result type'));

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
    if (imageBlob) {
        return (
            <div className={`mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]`}>
                <div
                    className={cn(
                        "relative",
                        isHover && "border-2 border-sky-500"
                    )}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setImageBlob("")}
                >
                    <Image
                        src={imageBlob}
                        alt="collection"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className={cn(
                            `h-auto w-full object-cover transition-all ${isHover &&  "opacity-20" }` 
                        )}
                    />
                    {isHover && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 p-2 opacity-100">
                            Remove
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return (


        <MediaPicker
            onChange={async (file) => {
                if (file) {
                    const blobUrl = URL.createObjectURL(file);
                    setImageBlob(blobUrl);
                    const arrayBuffer = await readFileAsArrayBuffer(file);
                    const uint8Array = new Uint8Array(arrayBuffer);
                    setImage(uint8Array)
                } else {
                    setImageBlob("");
                }
            }
            }
            onReset={() => {
                setImageBlob('');
            }}
            borderWidth="8px" label="Choose or drag and drop image" />
    )
}