"use client"; // Ensure it's a client component 

import { Home, LogOut, Book, CalendarCheck, ClipboardList, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "Dashboard", url: "#", icon: Home },
  { title: "Courses", url: "#", icon: Book },
  { title: "Attendance", url: "#", icon: CalendarCheck },
  { title: "Grading", url: "#", icon: ClipboardList },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Ensure sign-out redirects properly
  };

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex-1">
        {/* User Profile */}
        <div className="flex flex-col items-center pt-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={session?.user?.image || "https://i.imgur.com/kT3j3Lf.jpeg"} className="object-cover" />
            <AvatarFallback className="text-xl">
              {session?.user?.name ? session.user.name.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <p className="mt-2 text-lg font-semibold">{session?.user?.name || "Guest User"}</p>
          <p className="text-sm text-gray-500">Academic Head</p>
        </div>

        {/* Sidebar Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <a href={item.url} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full">
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button in Sidebar Footer */}
      <SidebarFooter className="p-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full text-black-600">
              <LogOut />
              <span>Logout</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will log you out of your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}
