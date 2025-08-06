import { getAllSiteMeta } from "@/lib/site-meta/data";
import MetaFormWrapper from "./components/meta-form-wrapper";
import Empty from "@/components/shared/empty";

export default async function SiteMetaPage() {
  const metaItems = await getAllSiteMeta();

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-xl font-semibold tracking-tight">Site Meta</h1>

      {
        metaItems.length > 0
        ? <MetaFormWrapper metaItems={metaItems} />
        : <Empty classes="text-black" message="Site Meta not available" />
      }
    </div>
  );
}
