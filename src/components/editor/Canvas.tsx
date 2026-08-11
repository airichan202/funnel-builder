"use client";

import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

export function Canvas({ children }: { children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className={`border-2 border-dashed rounded-lg p-4 min-h-[400px] ${isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"}`}
    >
      {children}
    </div>
  );
}
