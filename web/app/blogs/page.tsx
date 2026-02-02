export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const res = await fetch(
    "https://fv0uht0z.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==\"blog\"]",
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <pre style={{ padding: 40, whiteSpace: "pre-wrap" }}>
      BLOG PAGE LOADED (WINDOWS TEST)

      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
