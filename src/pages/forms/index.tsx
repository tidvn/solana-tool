import { Separator } from "@/components/ui/separator"
import ProfileForm from "@/components/app/forms/profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <Separator />
      <ProfileForm />
    </div>
  )
}
