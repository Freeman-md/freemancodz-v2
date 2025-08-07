import { getExperiencesWithDetails } from "@/lib/experiences/data";
import Journey from "./Journey.client";
import { getCertificationsWithDetails } from "@/lib/certifications/data";

export default async function JourneySection() {
  const [experienceData, certifications] = await Promise.all([
    getExperiencesWithDetails(),
    getCertificationsWithDetails()
  ]);

  const experiences = experienceData.map((experience) => ({
    ...experience,
    type: "experience" as const,
  }));

  return (
    <section id="journey" className="bg-dot-pattern">
      <Journey 
        experiences={experiences} 
        certifications={certifications}
        />
    </section>
  );
}
