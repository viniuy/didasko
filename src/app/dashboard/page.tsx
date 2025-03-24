'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { UpcomingEvents } from '@/components/upcoming-events';
import { Notes } from '@/components/notes';
import Calendar from '@/components/calendar';
import StatsGrid from '@/components/stats';
import { Menu } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex w-screen h-screen overflow-hidden'>
        <SidebarTrigger />
        {children}
        <div className='flex-1 flex overflow-hidden'>
          <div className='flex-1 overflow-y-auto p-4 md:p-6'>
            {/* Stats */}
            <StatsGrid />

            {/* Weekly Schedule */}
            <Calendar />
          </div>

          {/* Toggle Button for Mobile */}
          <button
            className='fixed top-4 right-4 z-50 p-2 bg-[#124A69] text-white rounded-md md:hidden'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className='w-6 h-6' />
          </button>

          {/* Right Sidebar (Responsive & Unscrollable) */}
          <div
            className={`fixed top-0 right-0 w-[90vw] max-w-[360px] md:w-[320px] lg:w-[360px] bg-[#124A69] p-4 pt-2 border-l h-[95vh] md:h-screen flex flex-col transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } md:relative md:translate-x-0`}
          >
            <div className='flex items-center justify-center space-x-4'>
              <img src='/didasko-logo.png' alt='Logo' className='w-64 h-22' />
            </div>

            {/* Sidebar Content (Auto-sizing) */}
            <div className='flex flex-col flex-grow space-y-4'>
              <UpcomingEvents />

              {/* Notes Section (No Extra Scroll) */}
              <div className='flex-grow'>
                <Notes />
              </div>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
