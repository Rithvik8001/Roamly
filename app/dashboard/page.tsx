import { auth } from "../utils/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { user } = session!;
  return (
    <div className="p-4">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
