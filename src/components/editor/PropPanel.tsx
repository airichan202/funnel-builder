"use client";

import { useState } from "react";

export function PropPanel({ block }: { block: any }) {
  const [title, setTitle] = useState(block?.title || "Headline");

  if (!block) return <div className="p-4 text-gray-500">Select a block to edit</div>;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Properties</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-1 border rounded-md"
        />
      </div>
    </div>
  );
}
