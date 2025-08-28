"use client";
import SignUp from "@/components/auth/sign-up";
import { useState } from "react";
import { authClient } from "@/app/utils/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/app/utils/validation";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signUpSchema.safeParse({ email, password });

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
      await authClient.signUp.email(
        {
          email,
          password,
          name: email,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully", {
              className: "bg-primary text-black",
            });
            router.push("/sign-in");
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

  const handleOAuthSignUp = async (provider: "github") => {
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
