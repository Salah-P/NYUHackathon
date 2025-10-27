import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Phone, MapPin, Edit } from "lucide-react"
import { EditProfileModal } from "./edit-profile-modal"
import type { User } from "@/lib/mock-data"

interface ProfileHeaderProps {
  user: User
  isOwnProfile?: boolean
}

export function ProfileHeader({ user, isOwnProfile = true }: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="h-24 w-24 flex-shrink-0 rounded-full bg-muted md:h-32 md:w-32" />

            <div className="flex-1 text-center md:text-left">
              <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:items-start">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <Badge variant="secondary" className="w-fit">
                  {user.role === "both" ? "Driver & Passenger" : user.role}
                </Badge>
              </div>

              <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <MapPin className="h-4 w-4" />
                  <span>{user.university}</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-center gap-6 md:justify-start">
              <div className="text-center">
                <div className="flex items-center gap-1 text-2xl font-bold text-foreground">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  {user.rating > 0 ? user.rating.toFixed(1) : "0.0"}
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{user.totalTrips}</div>
                  <div className="text-xs text-muted-foreground">Total Trips</div>
                </div>
              </div>

              {isOwnProfile && (
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto bg-transparent"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  )
}
