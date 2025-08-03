import { getAllSiteMeta } from "@/lib/site-meta/data";
import MetaFormWrapper from "./components/meta-form-wrapper";

export default async function SiteMetaPage() {
  const metaItems = await getAllSiteMeta();

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-xl font-semibold tracking-tight">Site Meta</h1>
      <MetaFormWrapper metaItems={metaItems} />
    </div>
  );
}
