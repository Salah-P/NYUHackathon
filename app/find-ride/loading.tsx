import { LoadingSpinner } from "@/components/loading-spinner"
import { Logo } from "@/components/logo"

export default function FindRideLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        {/* Logo */}
        <div className="animate-pulse">
          <Logo size="lg" nonClickable />
        </div>
        
        {/* Loading Spinner */}
        <LoadingSpinner 
          size="lg" 
          text="Finding Rides..." 
        />
      </div>
    </div>
  )
}



