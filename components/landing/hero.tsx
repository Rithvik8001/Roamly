import React from "react";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-6">
          <div className="text-center mx-auto max-w-4xl">
            <Badge
              variant="secondary"
              className="mb-6 text-sm font-medium rounded-md bg-transparent border border-primary/10 text-primary cursor-pointer hover:bg-primary/5 transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by AI
            </Badge>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Personalized Travel
              <span className="text-primary block">Itineraries</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Create perfect travel plans powered by AI, tailored to your
              budget, interests, and timeline. Smart budgeting meets intelligent
              planning for unforgettable journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 cursor-pointer">
                Start Planning Your Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
