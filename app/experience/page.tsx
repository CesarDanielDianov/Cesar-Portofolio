import type { Metadata } from "next";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work, student organizations and education of César Dianov.",
};

export default function ExperiencePage() {
  return <ExperienceTimeline />;
}
