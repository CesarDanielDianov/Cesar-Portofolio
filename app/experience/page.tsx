import type { Metadata } from "next";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";

export async function generateMetadata(): Promise<Metadata> {
  const t = dict[await getLang()].experience;
  return { title: t.title, description: t.metaDescription };
}

export default function ExperiencePage() {
  return <ExperienceTimeline />;
}
