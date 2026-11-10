import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "o6wiaocb", // public project id (also in the built bundle)
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fast, cached reads — fine for a public blog
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
