import { redirect } from "next/navigation";
import { auth } from "../utils/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>{session.user?.name}</h1>
      <p>{}</p>
    </div>
  );
}
