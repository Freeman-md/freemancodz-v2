import Empty from "@/components/shared/empty";
import { Services } from "@/types/showcase";
import { use } from "react";
export default function ServiceList({ data }: { data: Promise<Services[]> }) {
  const services = use(data);

  if (services.length <= 0) {
    return <Empty classes="text-black" message="No services found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
  );
}
