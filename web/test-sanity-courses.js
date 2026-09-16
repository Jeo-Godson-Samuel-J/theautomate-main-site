import { client } from "./lib/sanity.client.js";

async function main() {
  const courses = await client.fetch(`*[_type == "course"]{ title, slug, productUuid, sampleVideos }`);
  console.log(JSON.stringify(courses, null, 2));
}

main();
