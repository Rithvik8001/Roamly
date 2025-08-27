"use client";
import React from "react";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

interface SignInProps {
  email: string;
  password: string;
  handleEmailSignIn: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOAuthSignIn: (provider: "github") => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export default function SignIn({
  email,
  password,
  handleEmailSignIn,
  handleOAuthSignIn,
  setEmail,
  setPassword,
}: SignInProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-primary/10">
        <div className="max-w-md mx-auto w-full p-4">
          <div className="flex items-center justify-center gap-2 py-1 mt-32">
            <Image src={Logo} alt="Logo" width={32} height={32} />
            <span className="text-4xl font-bold font-serif">Roamly</span>
          </div>
          <p className="text-center text-md text-muted-foreground/50">
            This is the start of something good.
          </p>
          <div className="mt-4">
            <h2 className="text-2xl font-medium text-center tracking-tighter">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              onClick={() => handleOAuthSignIn("github")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
          </div>
          <form className="mt-4 space-y-4 w-full" onSubmit={handleEmailSignIn}>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="bg-background/40 border-none placeholder:text-muted-foreground/50 placeholder:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="bg-background/40 border-none placeholder:text-muted-foreground/50 placeholder:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between flex-col gap-2">
              <Button type="submit" className="w-full mt-4 cursor-pointer">
                Sign in
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
