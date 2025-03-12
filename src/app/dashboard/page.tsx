import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Notes } from "@/components/notes"
import  Calendar  from "@/components/calendar";
import StatsGrid from "@/components/stats";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats */}
          <StatsGrid />

          {/* Weekly Schedule */}
          <Calendar />
        </div>

        {/* Right sidebar */}
        <div className="w-80 bg-gray-50 p-6   overflow-y-auto border-l">
          <div className="text-2xl font-bold text-primary mb-6">DIDASKO</div>

          {/* Upcoming Events / FEED ALONGSIDE WEEKLY SCHEDULE*/}
          <UpcomingEvents/>    

          {/* Notes */}
          <Notes/>
        </div>
      </div>
      </main>
    </SidebarProvider>
    
  )
}
