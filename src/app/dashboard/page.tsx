"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw, Clock, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

type Festival = {
  id: string;
  title: string;
  studentsName: string;
  description: string;
  imageUrl: string;
  likes: number;
  createdAt: string;
};

type SortOption = "date" | "likes";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const router = useRouter();

  useEffect(() => {
    fetchFestivals();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("festivals_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "festivals",
        },
        (payload) => {
          console.log("Realtime change:", payload);

          if (payload.eventType === "INSERT") {
            setFestivals((prev) => [payload.new as Festival, ...prev]);
            toast({
              title: "New Booth Added",
              description: `${payload.new.title} has been added to the festival.`,
            });
          } else if (payload.eventType === "UPDATE") {
            setFestivals((prev) =>
              prev.map((festival) =>
                festival.id === payload.new.id
                  ? (payload.new as Festival)
                  : festival
              )
            );
            // Update selected festival if it's the one that changed
            if (selectedFestival?.id === payload.new.id) {
              setSelectedFestival(payload.new as Festival);
            }
          } else if (payload.eventType === "DELETE") {
            setFestivals((prev) =>
              prev.filter((festival) => festival.id !== payload.old.id)
            );
            // Clear selected festival if it was deleted
            if (selectedFestival?.id === payload.old.id) {
              setSelectedFestival(null);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    // Cleanup subscription
    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, []); // Remove selectedFestival.id from dependencies to prevent re-subscription

  const fetchFestivals = async () => {
    try {
      const { data, error } = await supabase
        .from("festivals")
        .select("*")
        .order(sortBy === "date" ? "created_at" : "likes", {
          ascending: false,
        });

      if (error) throw error;
      setFestivals(data || []);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch festivals. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, [sortBy]); // Refetch when sort option changes

  const handleLike = async (festivalId: string) => {
    try {
      const currentFestival = festivals.find((f) => f.id === festivalId);
      if (!currentFestival) return;

      const { error } = await supabase
        .from("festivals")
        .update({ likes: currentFestival.likes + 1 })
        .eq("id", festivalId);

      if (error) throw error;

      // Optimistic update
      setFestivals((prev) =>
        prev.map((festival) =>
          festival.id === festivalId
            ? { ...festival, likes: festival.likes + 1 }
            : festival
        )
      );

      if (selectedFestival?.id === festivalId) {
        setSelectedFestival((prev) =>
          prev ? { ...prev, likes: prev.likes + 1 } : null
        );
      }
    } catch (error) {
      console.error("Error liking festival:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like the booth. Please try again.",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchFestivals();
      toast({
        title: "Refreshed",
        description: "Festival data has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh data. Please try again.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSort = () => {
    setSortBy((prev) => (prev === "date" ? "likes" : "date"));
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Festival Booths</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSort}
            className="flex items-center gap-2"
          >
            {sortBy === "date" ? (
              <>
                <Clock className="h-4 w-4" />
                Sort by Date
              </>
            ) : (
              <>
                <ThumbsUp className="h-4 w-4" />
                Sort by Likes
              </>
            )}
          </Button>
        </div>
        <Button onClick={() => router.push("/upload")}>Create New Booth</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => (
          <Card
            key={festival.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => setSelectedFestival(festival)}
          >
            <CardHeader>
              <CardTitle>{festival.title}</CardTitle>
              <CardDescription>By {festival.studentsName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={festival.imageUrl}
                  alt={festival.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {new Date(festival.createdAt).toLocaleDateString()}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(festival.id);
                }}
              >
                <Heart className="h-5 w-5" />
                <span className="ml-2">{festival.likes}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Floating Refresh Button */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`h-6 w-6 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </Button>

      <Dialog
        open={!!selectedFestival}
        onOpenChange={() => setSelectedFestival(null)}
      >
        {selectedFestival && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedFestival.title}</DialogTitle>
              <DialogDescription>
                Created by {selectedFestival.studentsName}
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={selectedFestival.imageUrl}
                alt={selectedFestival.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {selectedFestival.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {new Date(selectedFestival.createdAt).toLocaleDateString()}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(selectedFestival.id)}
                >
                  <Heart className="h-5 w-5" />
                  <span className="ml-2">{selectedFestival.likes}</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
