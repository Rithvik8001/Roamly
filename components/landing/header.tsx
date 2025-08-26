import React from "react";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
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
            <Link href="/signup">
              <Button className="font-medium">Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
