import { redirect } from "next/navigation";
import { auth } from "../utils/auth";
import { headers } from "next/headers";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { HomeIcon, LogOutIcon, Plane } from "lucide-react";
import Image from "next/image";

async function handleSignOut() {
  "use server";
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="Roamly"
              width={32}
              height={32}
              className="rounded"
            />
            <h1 className="text-xl font-bold">Roamly</h1>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2 transition-all ease-in-out duration-500">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="/dashboard"
                  className="flex items-center gap-3 hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-500"
                >
                  <HomeIcon size={20} />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <a
                  href="/dashboard/itenaries"
                  className="flex items-center gap-3 hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-500"
                >
                  <Plane size={20} />
                  <span>Itineraries</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {session.user.name || session.user.email}
                </span>
              </div>
            </div>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOutIcon size={16} />
              </button>
            </form>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1">
        <SidebarTrigger className="p-2 cursor-pointer m-2 hover:bg-primary hover:text-white rounded-md  transition-all ease-in-out duration-500" />
        {children}
      </main>
    </SidebarProvider>
  );
}
