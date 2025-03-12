'use client';

import React, { useEffect, useRef, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

export default function Calendar() {
  const calendarRef = useRef<DayPilotCalendar>(null);

  const today = DayPilot.Date.today().toDate();
  const currentMonth = today.toLocaleDateString("en-us", { month: "long", year: "numeric" });

  const initialConfig: DayPilot.CalendarConfig = {
    viewType: "Week",
    weekStarts: 0,
    locale: "en-us",
    headerHeight: 50,
    eventMoveHandling: "Update",
    businessBeginsHour: 6, // ✅ Start at 6 AM
    businessEndsHour: 22,  // ✅ End at 10 PM
    heightSpec: "BusinessHours", // ✅ Show only business hours
    onEventMove: (args) => {
      console.log("Event moved:", args.e.data);

      const dp = calendarRef.current?.control;
      if (dp) {
        const updatedEvents = dp.events.list.map((event) =>
          event.id === args.e.id()
            ? { ...event, start: args.newStart, end: args.newEnd }
            : event
        );
        dp.update({ events: updatedEvents });
      }
    },
    onBeforeHeaderRender: (args) => {
      const date = args.header.start.toDate();
      const dayName = date.toLocaleDateString("en-us", { weekday: "long" });

      args.header.html = `
        <div style="text-align: center; font-size: 16px; font-weight: bold; color: black;">
          ${dayName}
        </div>
      `;
    },
  };

  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      events: [
        {
          id: "1",
          text: "Event 1",
          start: "2025-03-02T10:30:00",
          end: "2025-03-02T13:00:00",
        },
        {
          id: "2",
          text: "Meeting",
          start: "2024-10-03T14:00:00",
          end: "2024-10-03T15:30:00",
        },
      ],
    }));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-blue-800">
        Weekly Calendar
      </h2>
      <p className="text-center text-gray-600 mb-4">{currentMonth}</p>

      <div className="border rounded-lg overflow-hidden w-full h-[600px]">
        <DayPilotCalendar {...config} controlRef={calendarRef} />
      </div>
    </div>
  );
}
