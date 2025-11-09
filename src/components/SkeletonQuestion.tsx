"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle2 } from "lucide-react";

export default function SkeletonQuestions({ quantity }: { quantity: number }) {
  const skeletons = Array.from({ length: quantity });

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 bg-gray-100 rounded-xl p-5 sm:p-6 gap-5 shadow-md"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-200 p-1">
                <UserCircle2
                  size={36}
                  className="text-gray-300 animate-pulse"
                />
              </div>
              <Skeleton className="h-5 w-28 sm:w-36 rounded-md bg-gray-300 animate-pulse" />
            </div>
            <Skeleton className="h-4 w-40 sm:w-48 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Title + category */}
          <div className="flex flex-col gap-2 mt-1">
            <Skeleton className="h-5 w-3/4 sm:w-2/3 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-4 w-32 sm:w-40 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Body (texto) */}
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-3 w-full rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-11/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-9/12 rounded-md bg-gray-300 animate-pulse" />
            <Skeleton className="h-3 w-10/12 rounded-md bg-gray-300 animate-pulse" />
          </div>

          {/* Footer (botão) */}
          <div className="flex justify-end mt-2">
            <Skeleton className="h-10 w-full sm:w-32 rounded-lg bg-gray-300 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
