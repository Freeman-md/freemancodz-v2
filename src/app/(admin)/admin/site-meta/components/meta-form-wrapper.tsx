"use client";

import MetaForm from "./meta-form";
import { SiteMetaItem, SiteMetaType } from "@/types/site-meta";

// Define grouped layout
const GROUPS: Record<string, SiteMetaType[]> = {
  General: ["link", "text"],
  Images: ["image"],
  SEO: ["meta", "headline"],
  Contact: ["contact"],
  Sections: ["section_blocks"],
};

type Props = {
  metaItems: SiteMetaItem[];
};

export default function MetaFormWrapper({ metaItems }: Props) {
  return (
    <div className="space-y-12">
      {Object.entries(GROUPS).map(([groupLabel, types]) => {
        const items = metaItems.filter((item) => types.includes(item.type));
        if (items.length === 0) return null;

        const useGrid =
          ["General", "SEO", "Images"].includes(groupLabel);

        return (
          <section key={groupLabel} className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {groupLabel}
            </h2>

            <div
              className={
                useGrid
                  ? "grid sm:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {items.map((meta) => (
                <MetaFormCard key={meta.key} meta={meta} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MetaFormCard({ meta }: { meta: SiteMetaItem }) {
  return (
    <div className="rounded-lg border bg-background p-5 shadow-sm hover:shadow-md transition space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium capitalize">
          {meta.key.replace(/_/g, " ")}
        </h3>
        <span className="text-xs uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
          {meta.type}
        </span>
      </div>

      <MetaForm
        keyName={meta.key}
        type={meta.type}
        value={JSON.stringify(meta.value)}
      />
    </div>
  );
}
