import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { headers } from "next/headers";

export default async function ItineraryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host");
  const proto =
    hdrs.get("x-forwarded-proto") ||
    (process.env.NODE_ENV === "production" ? "https" : "http");
  const origin = `${proto}://${host}`;

  const res = await fetch(`${origin}/api/itineraries/${id}`, {
    headers: hdrs,
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed" }));
    return (
      <div className="p-4">
        <div className="text-red-600 text-sm mb-3">
          {err.error || "Failed to load"}
        </div>
        <Link href="/dashboard/itineraries">
          <Button className="cursor-pointer" variant="secondary">
            Back
          </Button>
        </Link>
      </div>
    );
  }

  const json = await res.json();
  const data = json.itinerary as {
    id: string;
    title: string;
    content: string;
    model?: string;
    createdAt: string;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold truncate">{data.title}</h1>
        <Link href="/dashboard/itineraries">
          <Button className="cursor-pointer" variant="secondary">
            Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-3">
            {new Date(data.createdAt).toLocaleString()}{" "}
            {data.model ? `• ${data.model}` : ""}
          </div>
          <Separator className="my-3" />
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
