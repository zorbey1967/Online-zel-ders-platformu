import type { Metadata } from "next";
import Link from "next/link";
import { TeacherApplyForm } from "@/components/TeacherApplyForm";

export const metadata: Metadata = {
  title: "Öğretmen ol",
  description: "Birebir'de öğretmen olarak ders ver.",
};

export default function OgretmenOlPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-28 md:grid-cols-2 md:px-8 md:pb-28 md:pt-32">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Eğitmen
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
          Öğretmen ol
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-[var(--ink-muted)]">
          Kendi programını yönet, birebir canlı ders ver, öğrencilerinle net
          hedeflerine odaklan. Başvuru demo ortamında tarayıcıda saklanır.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-[var(--ink)]">
          <li className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            Esnek müsaitlik ve saatlik ücret
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            Öğrenci paneli üzerinden rezervasyon
          </li>
          <li className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            Tek tıkla demo ders odası
          </li>
        </ul>
        <Link
          href="/giris?next=/ogretmen-panel"
          className="mt-10 inline-flex text-sm text-[var(--accent-deep)] underline-offset-2 hover:underline"
        >
          Zaten öğretmensen giriş yap →
        </Link>
      </div>
      <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-[var(--line)] md:p-8">
        <TeacherApplyForm />
      </div>
    </div>
  );
}
