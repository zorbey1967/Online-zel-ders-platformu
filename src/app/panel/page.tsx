import Link from "next/link";
import type { Metadata } from "next";
import { demoLessons } from "@/data/teachers";

export const metadata: Metadata = {
  title: "Panelim",
  description: "Yaklaşan derslerin ve ders linklerin.",
};

export default function PanelPage() {
  const upcoming = demoLessons.filter((l) => l.status === "upcoming");
  const past = demoLessons.filter((l) => l.status === "completed");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        Öğrenci
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-6xl">
        Panelim
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
        Merhaba. Yaklaşan canlı derslerin ve geçmiş oturumların burada.
      </p>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Yaklaşan dersler
        </h2>
        <ul className="mt-6 space-y-4">
          {upcoming.map((lesson) => (
            <li
              key={lesson.id}
              className="flex flex-col gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-[var(--line)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
                  {lesson.subject}
                </p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  {lesson.teacherName} · {lesson.date} · {lesson.time}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/ogretmenler/${lesson.teacherId}`}
                  className="btn-ghost text-sm"
                >
                  Profil
                </Link>
                {lesson.meetingUrl && (
                  <a
                    href={lesson.meetingUrl}
                    className="btn-primary text-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Derse katıl
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Tamamlanan
        </h2>
        <ul className="mt-6 space-y-3">
          {past.map((lesson) => (
            <li
              key={lesson.id}
              className="flex flex-col gap-1 rounded-2xl px-5 py-4 text-sm ring-1 ring-[var(--line)] sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-[var(--ink)]">
                {lesson.subject} · {lesson.teacherName}
              </span>
              <span className="text-[var(--ink-muted)]">
                {lesson.date} · {lesson.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 rounded-3xl bg-[var(--ink)] px-6 py-10 text-[var(--mist)] md:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl">
          Yeni ders mi?
        </h2>
        <p className="mt-3 max-w-md text-sm text-[var(--mist)]/70">
          Katalogdan öğretmen seç, müsait saatini ayırt.
        </p>
        <Link href="/ogretmenler" className="btn-primary mt-6 inline-flex">
          Öğretmenlere git
        </Link>
      </div>
    </div>
  );
}
