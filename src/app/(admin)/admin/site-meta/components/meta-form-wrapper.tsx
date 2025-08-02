"use client";

import { useState } from "react";
import MetaForm from "./meta-form";
import { SiteMetaItem } from "@/types/site-meta";

export default function MetaFormWrapper({ meta }: { meta: SiteMetaItem }) {
  const [value, setValue] = useState(JSON.stringify(meta.value, null, 2));

  return (
    <div className="rounded-md border p-4 space-y-4">
      <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        {meta.key} ({meta.type})
      </h2>

      <MetaForm keyName={meta.key} type={meta.type} value={value} setValue={setValue} />
    </div>
  );
}
