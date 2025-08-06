import { getServices } from "@/lib/services/data";
import WhatIDo from "./WhatIDo";

export default async function WhatIDoSection() {
  const services = await getServices();

  return (
    <section id="services" className="bg-dot-pattern">
      <WhatIDo services={services} />
    </section>
  );
}
