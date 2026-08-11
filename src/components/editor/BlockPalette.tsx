"use client";

import { useDraggable } from "@dnd-kit/core";
import type { ReactNode } from "react";

const BLOCKS = [
  { type: "headline", label: "Headline", preview: <h1 className="text-lg font-bold">Headline</h1> },
  { type: "subheadline", label: "Subheadline", preview: <h2 className="text-base">Subheadline</h2> },
  { type: "paragraph", label: "Paragraph", preview: <p className="text-sm">Paragraph...</p> },
  { type: "button", label: "Button", preview: <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Button</button> },
  { type: "image", label: "Image", preview: <div className="bg-gray-200 w-16 h-10 rounded flex items-center justify-center text-xs text-gray-500">Image</div> },
  { type: "divider", label: "Divider", preview: <hr className="border-gray-300" /> },
  { type: "spacer", label: "Spacer", preview: <div className="h-3 bg-gray-100 rounded" /> },
];

function BlockPaletteItem({ type, label, preview }: { type: string; label: string; preview: ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `block-${type}` });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 border rounded-md cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50" : ""}`}
    >
      {preview}
      <span className="text-xs text-gray-500 mt-1 block">{label}</span>
    </div>
  );
}

export function BlockPalette() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-gray-700">Blocks</h3>
      <div className="grid grid-cols-2 gap-2">
        {BLOCKS.map((b) => (
          <BlockPaletteItem key={b.type} type={b.type} label={b.label} preview={b.preview} />
        ))}
      </div>
    </div>
  );
}
