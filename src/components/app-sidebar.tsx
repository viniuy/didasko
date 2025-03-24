// 'use client'; // Ensure it's a client component

// import {
//   Home,
//   LogOut,
//   Book,
//   CalendarCheck,
//   ClipboardList,
//   Settings,
// } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarFooter,
// } from '@/components/ui/sidebar';

// // Menu items.
// const items = [
//   { title: 'Dashboard', url: '#', icon: Home },
//   { title: 'Courses', url: '#', icon: Book },
//   { title: 'Attendance', url: '#', icon: CalendarCheck },
//   { title: 'Grading', url: '#', icon: ClipboardList },
//   { title: 'Settings', url: '#', icon: Settings },
// ];

// export function AppSidebar() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/' }); // Ensure sign-out redirects properly
//   };

//   return (
//     <Sidebar className='h-screen flex flex-col'>
//       <SidebarContent className='flex-1'>
//         {/* User Profile */}
//         <div className='flex flex-col items-center pt-6'>
//           <Avatar className='w-24 h-24'>
//             <AvatarImage
//               src={session?.user?.image || 'https://i.imgur.com/kT3j3Lf.jpeg'}
//               className='object-cover'
//             />
//             <AvatarFallback className='text-xl'>
//               {session?.user?.name ? session.user.name.charAt(0) : '?'}
//             </AvatarFallback>
//           </Avatar>
//           <p className='mt-2 text-lg font-semibold'>
//             {session?.user?.name || 'Guest User'}
//           </p>
//           <p className='text-sm text-gray-500'>Academic Head</p>
//         </div>

//         {/* Sidebar Menu */}
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <a
//                     href={item.url}
//                     className='flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full'
//                   >
//                     <item.icon />
//                     <span>{item.title}</span>
//                   </a>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Logout Button in Sidebar Footer */}
//       <SidebarFooter className='p-4'>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className='flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full text-black-600'>
//               <LogOut />
//               <span>Logout</span>
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Are you sure you want to logout?
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action will log you out of your account.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={handleLogout}>
//                 Confirm
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

'use client';

import { useState } from 'react';
import {
  Home,
  LogOut,
  Book,
  CalendarCheck,
  ClipboardList,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const items = [
  { title: 'Dashboard', url: '#', icon: Home },
  { title: 'Courses', url: '#', icon: Book },
  { title: 'Attendance', url: '#', icon: CalendarCheck },
  { title: 'Grading', url: '#', icon: ClipboardList },
  { title: 'Settings', url: '#', icon: Settings },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Ensure sign-out redirects properly
  };

  return (
    <aside
      className={cn(
        'h-screen bg-[#124A69] shadow-md fixed top-0 left-0 flex flex-col items-center transition-all duration-300 ease-in-out',
        isOpen ? 'w-56 z-50' : 'w-20 z-40',
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className='flex items-center w-full p-3 gap-3'>
        <div className='w-12 h-12 flex-shrink-0 flex justify-center items-center'>
          <Avatar className='w-10 h-10'>
            <AvatarImage
              src={session?.user?.image || 'https://i.imgur.com/kT3j3Lf.jpeg'}
              className='object-cover'
            />
            <AvatarFallback className='text-xl'>CN</AvatarFallback>
          </Avatar>
        </div>
        <p
          className={cn(
            'text-lg font-semibold text-white transition-all duration-300 whitespace-nowrap',
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 w-0',
          )}
        >
          {session?.user?.name || 'Guest User'}
        </p>
      </div>

      <nav className='mt-2 flex flex-col items-center w-full'>
        {items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className='flex items-center w-full p-3 rounded transition-all duration-300 text-white hover:bg-[#8c8c8c] hover:bg-opacity-60'
          >
            <div className='w-10 h-10 flex-shrink-0 flex justify-center items-center'>
              <item.icon className='w-5 h-5 text-white' />
            </div>
            <span
              className={cn(
                'absolute left-16 transition-opacity duration-300',
                isOpen ? 'opacity-100' : 'opacity-0',
              )}
            >
              {item.title}
            </span>
          </a>
        ))}
      </nav>

      <div className='absolute bottom-6 w-full flex justify-center'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='flex items-center w-full p-3 rounded transition-all duration-300 text-white hover:bg-[#8c8c8c] hover:bg-opacity-60'>
              <div className='w-10 h-10 flex-shrink-0 flex justify-center items-center'>
                <LogOut className='w-5 h-5 text-white' />
              </div>
              <span
                className={cn(
                  'absolute left-16 transition-opacity duration-300',
                  isOpen ? 'opacity-100' : 'opacity-0',
                )}
              >
                Logout
              </span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to log out? You will need to log in again to
                access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogTrigger asChild>
                <Button variant='outline'>Cancel</Button>
              </AlertDialogTrigger>
              <Button onClick={handleLogout}>Logout</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </aside>
  );
}
