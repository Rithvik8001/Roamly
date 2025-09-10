import Itinerary from "@/components/itineraries/itinerary";
import ItinerariesList from "@/components/itineraries/list";

export default function ItinerariesPage() {
  return (
    <>
      <div className="px-4 sm:px-6">
        <h2 className="text-xl font-semibold mb-3">Create new itinerary</h2>
        <Itinerary />
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">My itineraries</h3>
          <ItinerariesList />
        </div>
      </div>
    </>
  );
}
