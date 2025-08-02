import { getAllSiteMeta } from "@/lib/site-meta/data";
import MetaFormWrapper from "./components/meta-form-wrapper";

export default async function SiteMetaPage() {
  const meta = await getAllSiteMeta();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Site Meta</h1>
      <div className="grid gap-6">
        {meta.map((item) => (
          <MetaFormWrapper key={item.key} meta={item} />
        ))}
      </div>
    </div>
  );
}
