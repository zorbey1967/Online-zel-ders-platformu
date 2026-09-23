import type { Metadata } from "next";
import { TeacherPanel } from "@/components/TeacherPanel";

export const metadata: Metadata = {
  title: "Öğretmen paneli",
};

export default function OgretmenPanelPage() {
  return <TeacherPanel />;
}
