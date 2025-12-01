// dashboard/user-profile/[[...user-profile]]/page.tsx
import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <div className="flex justify-center py-8">
      <UserProfile 
        path="/seller/dashboard/user-profile"
        routing="path"
      />
    </div>
  )
}