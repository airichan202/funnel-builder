import { TEMPLATES } from "@/lib/templates";
import Link from "next/link";

export default function TemplatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Template Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TEMPLATES.map((t) => (
          <Link
            key={t.id}
            href={`/templates/${t.id}`}
            className="block border rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <img src={t.thumbnail} alt={t.name} className="w-full h-24 object-cover rounded mb-2" />
            <p className="font-medium">{t.name}</p>
            <p className="text-xs text-gray-500">{t.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}