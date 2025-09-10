import Itinerary from "@/components/itineraries/itinerary";

export default function ItinerariesPage() {
  return (
    <>
      <div className="px-4 sm:px-6">
        <h2 className="text-xl font-semibold mb-3">Create new itinerary</h2>
        <Itinerary />
      </div>
    </>
  );
}
