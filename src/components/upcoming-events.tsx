import { Clock } from "lucide-react";


interface EventProps {
  date: string
  day: string
  title: string
  location: string
  time: string
  variant: "red" | "orange" | "yellow"
}

function Event({ date, day, title, location, time, variant }: EventProps) {
  return (
    <div className="flex items-start mb-4">
      <div className={`event-indicator ${variant}`} />
      <div>
        <div className="text-sm text-gray-500">
          {date} ({day})
        </div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-600">{location}</div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock size={12} className="mr-1" />
          {time}
        </div>
      </div>
    </div>
  )
}

export function UpcomingEvents() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

      <Event
        date="15 February 2023"
        day="Wednesday"
        title="Last Day of Sportsfest"
        location=""
        time="8:00 AM - 5:30 PM"
        variant="red"
      />

      <Event
        date="19 February 2023"
        day="Wednesday"
        title="MOBSTECH Exam"
        location="Room BSIT 611"
        time="11:30 AM - 1:00 PM"
        variant="orange"
      />

      <Event
        date="19 February 2023"
        day="Wednesday"
        title="WEBSTECH Exam"
        location="Room BSIT 611"
        time="4:00 PM - 5:30 PM"
        variant="yellow"
      />
    </div>
    
  )
  
}


