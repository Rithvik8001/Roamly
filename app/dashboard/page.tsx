import { auth } from "../utils/auth";
import { headers } from "next/headers";
import ItinerariesList from "@/components/itineraries/list";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { user } = session!;
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Welcome, {user.name || user.email}
      </h1>
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">My itineraries</h2>
        {/* client list fetches via /api/itineraries */}
        <ItinerariesList />
      </div>
    </div>
  );
}
