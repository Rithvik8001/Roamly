import { createAuthClient } from "better-auth/client";

function resolveClientBaseURL(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000"
  );
}

export const authClient = createAuthClient({
  baseURL: resolveClientBaseURL(),
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
