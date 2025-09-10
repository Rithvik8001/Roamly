"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";

export default function DeleteItineraryButton({
  id,
  title,
}: {
  id: string;
  title?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/itineraries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok && res.status !== 204) {
        const err = await res
          .json()
          .catch(() => ({ error: "Failed to delete" }));
        throw new Error(err.error || "Failed to delete");
      }
      toast.success("Successfully deleted itinerary");
      setOpen(false);
      router.push("/dashboard/itineraries");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete itinerary?</DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone.
            {title ? `\n\n${title}` : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
