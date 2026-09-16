import { createClient } from "next-sanity";

const client = createClient({
  projectId: "mct9iukj", // Wait, I don't know the project ID here.
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
