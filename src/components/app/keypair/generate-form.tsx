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
import { CopyIcon } from "@radix-ui/react-icons"
import * as bip39 from "bip39";
import * as crypto from "crypto";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js"
import { toast } from "@/components/ui/use-toast"
import bs58 from "bs58"





const GenerateForm = () => {
  const [path, setPath] = useState(`m/44'/501'/0'/0'`)
  const [keypair, setKeypair] = useState(new Keypair())
  const [error, setError] = useState("")

  const [result, setResult] = useState({
    entropyByte: "",
    entropyHex: "",
    mnemonic: "",
    seed: ""
  });

  useEffect(() => {
    if (result.seed) {
      try {
        setError("")
        const hd = HDKey.fromMasterSeed(result.seed);
        const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
        setKeypair(keypair)
        printKeypair(keypair)
      } catch {
        setError("HD Path Error")
      }

    }
  }, [path, result]);

  function printKeypair(keypair: Keypair) {
    const publicKey = keypair.publicKey.toBase58()
    // const secretKey = Array.from(keypair.secretKey, byte => byte.toString(16).padStart(2, '0')).join('');
    const secretKey  = bs58.encode(keypair.secretKey);
    return JSON.stringify({ publicKey: publicKey, secretKey: secretKey }, null, 2)
  }

  function onSubmit() {
    const entropy = crypto.randomBytes(16);
    const binaryString = entropy.reduce((acc, byte) => {
      return acc + byte.toString(2).padStart(8, '0');
    }, '');
    const entropyHex = entropy.toString('hex');

    const mnemonic = bip39.entropyToMnemonic(entropyHex);
    const seed = bip39.mnemonicToSeedSync(mnemonic, "");
    const seedHex = seed.toString("hex");
    setResult({
      entropyByte: binaryString,
      entropyHex: entropyHex,
      mnemonic: mnemonic,
      seed: seedHex
    })
  }

  return (
    <KeypairLayout>
      <div className="space-y-8">
        <Button onClick={onSubmit}>Generate</Button>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              entropyByte
            </Label>
            <Textarea
              id="entropyByte"
              value={result.entropyByte}
              readOnly

            />
          </div>
          <Button onClick={async () => {
            await navigator.clipboard.writeText(result.entropyByte);
            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              entropyHex
            </Label>
            <Input
              id="entropyHex"
              value={result.entropyHex}
              readOnly
              className="h-15"
            />
          </div>
          <Button onClick={async () => {
            await navigator.clipboard.writeText(result.entropyHex);
            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              mnemonic
            </Label>
            <Textarea
              id="mnemonic"
              value={result.mnemonic}
              readOnly
            />
          </div>
          <Button onClick={async () => {
            await navigator.clipboard.writeText(result.mnemonic);
            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              seed
            </Label>
            <Textarea
              id="seed"
              value={result.seed}
              readOnly
            />
          </div>
          <Button onClick={async () => {
            await navigator.clipboard.writeText(result.seed);
            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">
              HD Path <span className="text-red-500">
                {error}
              </span>
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
          <Button onClick={async () => {
            await navigator.clipboard.writeText(error == "" ? keypair.publicKey.toBase58() : "");

            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
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
          <Button onClick={async () => {
            await navigator.clipboard.writeText(error == "" ? printKeypair(keypair) : "");
            toast({ title: "Copied" })
          }} size="sm" className="px-3">

            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </KeypairLayout >
  )
}

export default GenerateForm
