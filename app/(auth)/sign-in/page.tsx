"use client";
import { authClient } from "@/app/utils/auth-client";
import SignIn from "@/components/auth/sign-in";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully");
            router.push("/dashboard");
          },
          onError: (error: any) => {
            toast.error(error.message);
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleOAuthSignIn = async (provider: "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
        errorCallbackURL: "/sign-up?error=oauth_error",
      });
    } catch (error: any) {
      toast.error(`Failed to sign in with ${provider}`);
    }
  };
  return (
    <>
      <SignIn
        email={email}
        password={password}
        handleEmailSignIn={handleEmailSignIn}
        handleOAuthSignIn={handleOAuthSignIn}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
}
