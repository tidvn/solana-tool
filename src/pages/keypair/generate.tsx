import { Separator } from "@/components/ui/separator"
import GenerateForm from "@/components/app/keypair/generate-form"

export default function KeypairGeneratePage() {
  return (
    <div className="space-y-6">
      <Separator />
      <GenerateForm />
    </div>
  )
}
