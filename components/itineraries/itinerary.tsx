"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCompletion } from "@ai-sdk/react";
import { ScrollArea } from "../ui/scroll-area";
import { ClipboardCopy, Check, Compass, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Itinerary() {
  const {
    completion,
    isLoading,
    error,
    handleSubmit,
    input,
    handleInputChange,
  } = useCompletion({
    api: "/api/itinerary",
    streamProtocol: "text",
  });

  const [copied, setCopied] = useState<boolean>(false);

  async function handleCopy() {
    try {
      if (!completion?.trim()) return;
      await navigator.clipboard.writeText(completion);
      setCopied(true);
      toast.success("Itinerary copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  }

  return (
    <>
      <div className="min-h-[90vh] p-4 flex items-start justify-center">
        <div className="w-full max-w-3xl mx-auto relative">
          <form
            className="mx-4 sm:mx-0 sm:m-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim() || isLoading) return;
              handleSubmit(e);
            }}
          >
            <div className="rounded-md bg-primary/15 text-primary px-3 py-2 text-xs sm:text-sm font-medium">
              Enter travel plan info: city, country, budget, etc.
            </div>
            <div className="grid gap-2 sm:gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
              <Input
                name="prompt"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter the details of your trip.."
                className="w-full h-12 sm:h-12 px-4 rounded-xl placeholder:text-muted-foreground text-sm md:text-base border border-primary/50"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="cursor-pointer h-12 sm:h-12 px-5 sm:self-stretch"
              >
                {isLoading ? "Generating..." : "Generate Itinerary"}
              </Button>
            </div>
          </form>

          {!completion && !isLoading && !error && (
            <div className="mx-4 mt-4 sm:mx-0 sm:m-4 border border-dashed rounded-lg p-6 sm:p-8 text-center text-muted-foreground">
              <div className="flex items-center justify-center mb-2">
                <Compass className="h-6 w-6" />
              </div>
              <p>
                Describe your trip details and click Generate Itinerary to
                begin.
              </p>
            </div>
          )}

          {(isLoading || completion || error) && (
            <Card className="mx-4 mt-4 sm:mx-0 sm:m-4 border-primary/20 shadow-sm rounded-xl">
              <div className="flex items-center justify-between px-4 pt-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  Generated Itinerary
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={handleCopy}
                    disabled={!completion?.trim()}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="h-4 w-4 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="cursor-pointer"
                    disabled={!completion?.trim()}
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/itineraries", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            title: input?.slice(0, 80) || "Untitled",
                            prompt: input,
                            content: completion,
                            model: "sonar-pro",
                          }),
                        });
                        if (!res.ok) throw new Error("Failed to save");
                        toast.success("Itinerary saved");
                      } catch (e) {
                        toast.error("Failed to save itinerary");
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <Separator className="my-3" />
              <CardContent className="p-0">
                {error ? (
                  <div className="p-4 text-red-600">
                    There was an error generating the itinerary. Please try
                    again.
                  </div>
                ) : (
                  <ScrollArea className="h-[58vh] sm:h-[60vh] md:h-[65vh]">
                    <div className="p-4">
                      {completion ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            img: (props) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                {...props}
                                className="rounded-lg border mt-2 mb-4 max-h-64 sm:max-h-80 w-full object-cover"
                                alt={props.alt ?? ""}
                              />
                            ),
                          }}
                        >
                          {completion}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Preparing your itinerary...
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
