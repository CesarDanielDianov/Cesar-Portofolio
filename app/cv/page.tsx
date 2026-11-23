import type { Metadata } from "next";
import { dict } from "@/content/i18n";
import { getLang } from "@/lib/i18n-server";
import CvViewer from "@/components/cv/CvViewer";

export async function generateMetadata(): Promise<Metadata> {
  const t = dict[await getLang()].cv;
  return { title: t.title, description: t.metaDescription };
}

export default function CvPage() {
  return <CvViewer />;
}
