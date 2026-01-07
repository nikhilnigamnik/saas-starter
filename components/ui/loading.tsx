import React from 'react';

export function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index + 1} className="bg-secondary h-10 rounded-lg w-full animate-pulse" />
      ))}
    </div>
  );
}
