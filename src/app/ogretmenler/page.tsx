import type { Metadata } from "next";
import { TeacherDirectory } from "@/components/TeacherDirectory";

export const metadata: Metadata = {
  title: "Öğretmenler",
  description: "Matematik, fizik, İngilizce ve yazılım öğretmenlerini keşfet.",
};

export default function TeachersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        Katalog
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-6xl">
        Öğretmenler
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
        Konuna ve seviyene uygun eğitmeni filtrele, profiline girip ders ayırt.
      </p>
      <div className="mt-12">
        <TeacherDirectory />
      </div>
    </div>
  );
}
