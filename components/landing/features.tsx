import { Sparkles, Clock, Users, Star, Calculator, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function Features() {
  return (
    <>
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything You Need for Perfect Trips
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands your preferences and creates detailed
              itineraries with smart budgeting insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">
                  AI Itinerary Generator
                </CardTitle>
                <CardDescription className="text-base">
                  Personalized travel plans based on your unique preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Custom duration planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Group size optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">
                    Interest-based recommendations
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-serif text-2xl">
                  Smart Trip Budgeting
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered cost estimates for every aspect of your journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Flight & accommodation costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Food & dining estimates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">
                    Activity & entertainment budgets
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
