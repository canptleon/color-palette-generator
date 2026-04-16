import React from "react";

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 min-w-[160px] w-[160px] flex-shrink-0">
      <div className="h-40 skeleton" />
      <div className="p-3 bg-white dark:bg-slate-800 flex flex-col gap-2">
        <div className="h-4 w-20 skeleton rounded-full" />
        <div className="h-3 w-28 skeleton rounded-full" />
        <div className="h-3 w-24 skeleton rounded-full" />
        <div className="h-7 skeleton rounded-lg mt-1" />
      </div>
    </div>
  );
}

interface Props {
  count?: number;
}

export default function SkeletonPalette({ count = 5 }: Props) {
  return (
    <div className="space-y-10">
      {Array.from({ length: 4 }).map((_, row) => (
        <div key={row}>
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="h-5 w-32 skeleton rounded-full mb-2" />
              <div className="h-3 w-48 skeleton rounded-full" />
            </div>
            <div className="h-7 w-20 skeleton rounded-lg" />
          </div>
          {/* Cards skeleton */}
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
