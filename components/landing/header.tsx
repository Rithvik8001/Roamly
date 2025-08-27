import React from "react";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/app/utils/auth";
import { headers } from "next/headers";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Roamly"
                width={32}
                height={32}
                className="rounded-full bg-transparent"
              />
              <span className="text-2xl font-bold font-serif">Roamly</span>
            </div>
            {session ? (
              <Link href="/dashboard">
                <Button className="font-medium cursor-pointer">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button className="font-medium cursor-pointer">
                  Get Started
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
