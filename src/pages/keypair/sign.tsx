import { Separator } from "@/components/ui/separator"
import SignForm from "@/components/app/keypair/sign-form"

export default function KeypairSignPage() {
  return (
    <div className="space-y-6">
      <Separator />
      <SignForm />
    </div>
  )
}
