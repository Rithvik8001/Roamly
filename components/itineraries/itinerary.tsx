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
      <div className="min-h-[90vh] px-2 py-4 flex items-start justify-center">
        <div className="w-full max-w-3xl mx-auto relative">
          <form
            className="mx-2 sm:mx-0 sm:m-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim() || isLoading) return;
              handleSubmit(e);
            }}
          >
            <div className="rounded-md bg-primary/15 text-primary px-3 py-2 text-xs sm:text-sm font-medium">
              Describe your trip: destination, dates/duration, budget,
              travelers, and interests. Example: "Paris, France • Oct 3–7 • 5
              days • $1500 • 2 adults • museums & food"
            </div>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-stretch">
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
            <div className="mx-2 mt-4 sm:mx-0 sm:m-4 border border-dashed rounded-lg p-6 sm:p-8 text-center text-muted-foreground">
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
            <Card className="mx-2 mt-4 sm:mx-0 sm:m-4 border-primary/20 shadow-sm rounded-xl">
              <div className="flex items-center justify-between px-2 py-1">
                <h3 className="text-sm sm:text-base font-medium leading-tight my-0 flex items-center gap-2">
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  Generated Itinerary
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer min-w-[80px]"
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
                    className="cursor-pointer min-w-[80px]"
                    disabled={!completion?.trim()}
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/itineraries", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({
                            title: input?.slice(0, 80) || "Untitled",
                            prompt: input,
                            content: completion,
                            model: "sonar",
                          }),
                        });
                        if (!res.ok) {
                          const err = await res
                            .json()
                            .catch(() => ({ error: "Failed to save" }));
                          throw new Error(err.error || "Failed to save");
                        }
                        toast.success("Itinerary saved");
                      } catch (e) {
                        const msg =
                          e instanceof Error
                            ? e.message
                            : "Failed to save itinerary";
                        toast.error(msg);
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <Separator className="my-1" />
              <CardContent className="p-0">
                {error ? (
                  <div className="p-4 text-red-600">
                    There was an error generating the itinerary. Please try
                    again.
                  </div>
                ) : (
                  <ScrollArea className="h-[54vh] sm:h-[58vh] md:h-[62vh]">
                    <div className="px-3 py-3">
                      {completion ? (
                        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none break-words">
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
                              table: ({ children }) => (
                                <table className="w-full table-fixed border-collapse">
                                  {children}
                                </table>
                              ),
                              th: ({ children }) => (
                                <th className="text-left align-top p-2 border-b">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="align-top p-2 border-b/0">
                                  {children}
                                </td>
                              ),
                              tr: ({ children }) => (
                                <tr className="align-top">{children}</tr>
                              ),
                              ul: ({ children }) => (
                                <ul className="pl-5">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="pl-5">{children}</ol>
                              ),
                              p: ({ children }) => (
                                <p className="my-2">{children}</p>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-base sm:text-lg mt-3 mb-2">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm sm:text-base mt-3 mb-1">
                                  {children}
                                </h3>
                              ),
                            }}
                          >
                            {completion}
                          </ReactMarkdown>
                        </div>
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
