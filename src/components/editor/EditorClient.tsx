"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Canvas } from "./Canvas";
import { BlockPalette } from "./BlockPalette";
import { PropPanel } from "./PropPanel";
import { useState } from "react";

type Block = { id: string; type: string; props: Record<string, any> };

export function EditorClient({ funnelId, funnelName }: { funnelId: string; funnelName: string }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selected, setSelected] = useState<Block | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || over.id !== "canvas") return;

    const type = (active.id as string).replace("block-", "");
    const newBlock: Block = { id: crypto.randomUUID(), type, props: { text: type } };
    setBlocks((prev) => [...prev, newBlock]);
  }

  async function handleSave() {
    setStatus("saving");
    await fetch(`/api/funnels/${funnelId}/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepOrder: 1, title: "Page 1", jsonBlocks: blocks }),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  async function handlePublish() {
    await fetch(`/api/funnels/${funnelId}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "live" }),
    });
    alert("Funnel published!");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{funnelName}</h1>
        <div className="flex gap-2 items-center">
          {status === "saved" && <span className="text-sm text-green-600">Saved!</span>}
          <button onClick={handleSave} disabled={status === "saving"} className="px-3 py-1 border rounded-md text-sm">
            {status === "saving" ? "Saving..." : "Save"}
          </button>
          <button onClick={handlePublish} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
            Publish
          </button>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 bg-white p-3 rounded-lg border">
            <BlockPalette />
          </div>
          <div className="col-span-6">
            <Canvas>
              {blocks.length === 0 ? (
                <p className="text-gray-400 text-center mt-8">Drag blocks here</p>
              ) : (
                <div className="space-y-2">
                  {blocks.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelected(b)}
                      className={`p-2 rounded border cursor-pointer ${selected?.id === b.id ? "border-blue-500" : "border-transparent hover:border-gray-300"}`}
                    >
                      {b.type === "headline" && <h1 className="text-2xl font-bold">{b.props.text}</h1>}
                      {b.type === "subheadline" && <h2 className="text-xl">{b.props.text}</h2>}
                      {b.type === "paragraph" && <p>{b.props.text}</p>}
                      {b.type === "button" && <button className="bg-blue-600 text-white px-4 py-2 rounded">{b.props.text}</button>}
                      {b.type === "image" && <div className="bg-gray-200 h-32 rounded flex items-center justify-center text-gray-500">Image</div>}
                      {b.type === "divider" && <hr />}
                      {b.type === "spacer" && <div className="h-8" />}
                    </div>
                  ))}
                </div>
              )}
            </Canvas>
          </div>
          <div className="col-span-3 bg-white p-3 rounded-lg border">
            <PropPanel block={selected} />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
