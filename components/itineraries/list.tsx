"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Item = { id: string; title: string; createdAt: string };

export default function ItinerariesList() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/itineraries", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (mounted) {
          setItems(
            (data.itineraries || []).map((x: any) => ({
              id: x.id,
              title: x.title,
              createdAt: x.createdAt,
            }))
          );
        }
      } catch (e) {
        if (mounted) setError("Failed to load itineraries");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-sm">{error}</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No itineraries yet. Generate one and click Save.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <a key={it.id} href={`/dashboard/itineraries/${it.id}`}>
          <Card className="p-4 hover:border-primary transition-colors">
            <div className="text-sm font-medium truncate">{it.title}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(it.createdAt).toLocaleString()}
            </div>
            <div className="flex justify-end mt-2">
              <Button size="sm" variant="secondary" className="cursor-pointer">
                View
              </Button>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
