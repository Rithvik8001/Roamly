"use client";
import SignUp from "@/components/auth/sign-up";
import { useState } from "react";
import { authClient } from "@/app/utils/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name: email,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/sign-in");
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

  const handleOAuthSignUp = async (provider: "github") => {
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
      <SignUp
        email={email}
        password={password}
        handleEmailSignUp={handleEmailSignUp}
        handleOAuthSignUp={handleOAuthSignUp}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
}
