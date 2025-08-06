import { getExperiencesWithDetails } from "@/lib/experiences/data";
import Journey from "./Journey";

export default async function JourneySection() {
  const experienceData = await getExperiencesWithDetails();
  const experiences = experienceData.map((experience) => ({
    ...experience,
    type: "experience" as const,
  }));

  return (
    <section id="journey" className="bg-dot-pattern">
      <Journey experiences={experiences} />
    </section>
  );
}
