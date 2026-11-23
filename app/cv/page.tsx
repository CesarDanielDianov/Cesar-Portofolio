import type { Metadata } from "next";
import CvViewer from "@/components/cv/CvViewer";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of César Dianov.",
};

export default function CvPage() {
  return <CvViewer />;
}
