export const TEMPLATES = [
  {
    id: "lead-gen",
    name: "Lead Generation",
    category: "Marketing",
    thumbnail: "https://via.placeholder.com/150x100?text=Lead+Gen",
    jsonBlocks: [
      { type: "headline", props: { text: "Get Your Free Guide" } },
      { type: "paragraph", props: { text: "Download our exclusive guide now." } },
      { type: "form", props: { fields: [{ name: "email", label: "Email", type: "email" }] } },
      { type: "button", props: { text: "Download", href: "#" } },
    ],
  },
  {
    id: "product-launch",
    name: "Product Launch",
    category: "Sales",
    thumbnail: "https://via.placeholder.com/150x100?text=Product+Launch",
    jsonBlocks: [
      { type: "headline", props: { text: "Introducing Our New Product" } },
      { type: "paragraph", props: { text: "The best solution for your needs." } },
      { type: "image", props: { src: "https://via.placeholder.com/400x200", alt: "Product" } },
      { type: "button", props: { text: "Buy Now", href: "#" } },
    ],
  },
  {
    id: "webinar",
    name: "Webinar Signup",
    category: "Events",
    thumbnail: "https://via.placeholder.com/150x100?text=Webinar",
    jsonBlocks: [
      { type: "headline", props: { text: "Join Our Free Webinar" } },
      { type: "paragraph", props: { text: "Learn from the experts." } },
      { type: "form", props: { fields: [{ name: "email", label: "Email", type: "email" }] } },
      { type: "button", props: { text: "Register", href: "#" } },
    ],
  },
  {
    id: "optin",
    name: "Opt-in Page",
    category: "Marketing",
    thumbnail: "https://via.placeholder.com/150x100?text=Opt-in",
    jsonBlocks: [
      { type: "headline", props: { text: "Subscribe to Our Newsletter" } },
      { type: "paragraph", props: { text: "Get updates in your inbox." } },
      { type: "form", props: { fields: [{ name: "email", label: "Email", type: "email" }] } },
      { type: "button", props: { text: "Subscribe", href: "#" } },
    ],
  },
  {
    id: "coming-soon",
    name: "Coming Soon",
    category: "Maintenance",
    thumbnail: "https://via.placeholder.com/150x100?text=Coming+Soon",
    jsonBlocks: [
      { type: "headline", props: { text: "Coming Soon" } },
      { type: "paragraph", props: { text: "We're launching soon. Stay tuned!" } },
      { type: "spacer" },
      { type: "button", props: { text: "Notify Me", href: "#" } },
    ],
  },
];

export function getTemplateById(id: string) {
  return TEMPLATES.find((t) => t.id === id);
}