import type { Metadata } from "next";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";
import ProjectGrid from "@/components/projects/ProjectGrid";

export async function generateMetadata(): Promise<Metadata> {
  const t = dict[await getLang()].projects;
  return { title: t.title, description: t.metaDescription };
}

export default function ProjectsPage() {
  return <ProjectGrid />;
}
