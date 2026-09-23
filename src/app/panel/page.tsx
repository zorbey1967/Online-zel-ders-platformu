import type { Metadata } from "next";
import { StudentPanel } from "@/components/StudentPanel";

export const metadata: Metadata = {
  title: "Panelim",
  description: "Yaklaşan derslerin ve ders linklerin.",
};

export default function PanelPage() {
  return <StudentPanel />;
}
