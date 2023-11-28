import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import KeypairLayout from "@/components/app/keypair/layout-page"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { SunIcon } from "@radix-ui/react-icons"
import * as bip39 from "bip39";
import * as crypto from "crypto";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js"
import { toast } from "@/components/ui/use-toast"





const ConvertForm = () => {
  const [path, setPath] = useState(`m/44'/501'/0'/0'`)
  const [keypair, setKeypair] = useState(new Keypair())
  const [error, setError] = useState("")

  const [input, setInput] = useState({
    entropyByte: "",
    entropyHex: "",
    mnemonic: "",
    seed: ""
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value,
    }));



  };


  useEffect(() => {
    if (input.seed) {
      try {
        setError("")
        const hd = HDKey.fromMasterSeed(input.seed);
        const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
        setKeypair(keypair)
        printKeypair(keypair)
      } catch {
        setError("HD Path Error")
      }

    }
  }, [path, input]);

  function printKeypair(keypair: Keypair) {
    const publicKey = keypair.publicKey.toBase58()
    const secretKey = Array.from(keypair.secretKey, byte => byte.toString(16).padStart(2, '0')).join('');
    return JSON.stringify({ publicKey: publicKey, secretKey: secretKey }, null, 2)
  }

  function onSubmit(name: string, value: string) {
    try {
      var entropyByte = ""
      var entropyHex = ""
      var mnemonic = ""
      var seed = ""
      if (name == "entropyByte") {
        entropyByte = value
        entropyHex = BigInt(`0b${value}`).toString(16);
        mnemonic = bip39.entropyToMnemonic(entropyHex)
        seed = bip39.mnemonicToSeedSync(mnemonic, "").toString("hex");
      } else if (name == "entropyHex") {
        entropyByte = BigInt(`0x${value}`).toString(2)
        entropyHex = value
        mnemonic = bip39.entropyToMnemonic(entropyHex)
        seed = bip39.mnemonicToSeedSync(mnemonic, "").toString("hex");

      } else if (name == "mnemonic") {

        entropyHex = bip39.mnemonicToEntropy(value)
        entropyByte = BigInt(`0x${entropyHex}`).toString(2)
        mnemonic = value
        seed = bip39.mnemonicToSeedSync(mnemonic, "").toString("hex");
      }
      setInput({
        entropyByte: entropyByte,
        entropyHex: entropyHex,
        mnemonic: mnemonic,
        seed: seed
      });
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <KeypairLayout>
      {error}
      <div className="space-y-8">
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              entropyByte
            </Label>
            <Textarea
              id="entropyByte"
              name="entropyByte"
              value={input.entropyByte}
              onChange={handleChange}

            />
          </div>
          <Button onClick={() => onSubmit("entropyByte", input.entropyByte)} size="sm" className="px-3">

            <SunIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              entropyHex
            </Label>
            <Input
              id="entropyHex"
              name="entropyHex"
              value={input.entropyHex}
              onChange={handleChange}
              className="h-15"
            />
          </div>
          <Button onClick={() => onSubmit("entropyHex", input.entropyHex)} size="sm" className="px-3">

            <SunIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              mnemonic
            </Label>
            <Textarea
              id="mnemonic"
              name="mnemonic"
              value={input.mnemonic}
              onChange={handleChange}
            />
          </div>
          <Button onClick={() => onSubmit("mnemonic", input.mnemonic)} size="sm" className="px-3">

            <SunIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              seed
            </Label>
            <Textarea
              id="seed"
              name="seed"
              value={input.seed}
              readOnly
            />
          </div>

        </div>

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              HD Path
            </Label>
            <Input
              id="path"
              value={path}
              onChange={(event) => setPath(event.target.value)}
              className="h-15"
            />
          </div>
        </div>


        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              public key
            </Label>
            <Input
              id="publicKey"
              value={error == "" ? keypair.publicKey.toBase58() : ""}
              readOnly
              className="h-15"
            />
          </div>

        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              Keypair Json
            </Label>
            <Textarea
              id="keypairJson"
              value={error == "" ? printKeypair(keypair) : ""}
              readOnly
              className="min-h-[200px]"

            />
          </div>

        </div>
      </div>
    </KeypairLayout >
  )
}

export default ConvertForm
