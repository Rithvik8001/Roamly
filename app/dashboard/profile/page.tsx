"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        if (mounted) {
          setName(data.name || "");
          setEmail(data.email || "");
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function save() {
    try {
      setSaving(true);
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      if (!res.ok && res.status !== 204)
        throw new Error("Failed to update profile");
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input value={email} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={save}
                  disabled={saving || !name.trim()}
                  className="cursor-pointer"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
