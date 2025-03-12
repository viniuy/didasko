"use client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default async function DashboardPage() {
  // Get the server-side session
  const session = await getServerSession();
  const [error, setError] = useState("");

  // If no session or user exists, redirect to login page
  if (!session?.user) {
    redirect("/login");
  }

  const handleLogout = async () => {
    try {
      // Trigger Google sign-in via NextAuth
      signOut({ callbackUrl: "/" });

    } catch (err) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {session.user.name}</CardTitle>
                <CardDescription>You are now signed in with your Google account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  {/* User's profile image */}
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground">{session.user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sign out button */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
