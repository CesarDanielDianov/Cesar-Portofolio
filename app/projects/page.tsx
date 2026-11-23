import type { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects by César Dianov: AI solvers, systems programming, databases and more.",
};

export default function ProjectsPage() {
  return <ProjectGrid />;
}
