"use client";
import { authClient } from "@/app/utils/auth-client";
import SignIn from "@/components/auth/sign-in";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/app/utils/validation";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signInSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const errors = validationResult.error.issues;
      toast.error(errors[0].message, {
        description: errors.map((err: any) => err.message).join(", "),
        duration: 1000,
        className: "bg-primary text-black",
      });
      return;
    }

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Signed in successfully", {
              className: "bg-primary text-black",
            });
            router.push("/dashboard");
          },
          onError: (error: any) => {
            toast.error(error.message, {
              description: error.message,
              duration: 1000,
              className: "bg-primary text-black",
            });
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message, {
        description: error.message,
        duration: 1000,
        className: "bg-primary text-black",
      });
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
      toast.error(`Failed to sign in with ${provider}`, {
        description: `Failed to sign in with ${provider}`,
        duration: 1000,
        className: "bg-primary text-black",
      });
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
