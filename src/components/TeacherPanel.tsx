"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { teachers } from "@/data/teachers";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-5 py-4 ring-1 ring-[var(--line)]">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
        {value}
      </p>
    </div>
  );
}

export function TeacherPanel() {
  const { user, lessons, ready, completeLesson } = useApp();

  const teacherId = user?.teacherId ?? "ayse-kaya";
  const teacher = teachers.find((t) => t.id === teacherId);

  const myLessons = useMemo(
    () => lessons.filter((l) => l.teacherId === teacherId),
    [lessons, teacherId],
  );
  const upcoming = myLessons.filter((l) => l.status === "upcoming");
  const completed = myLessons.filter((l) => l.status === "completed");

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8">
        <p className="text-[var(--ink-muted)]">Yükleniyor…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
          Öğretmen paneli
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          Öğretmen hesabınla giriş yap.
        </p>
        <Link
          href="/giris?next=/ogretmen-panel"
          className="btn-primary mt-8 inline-flex"
        >
          Giriş yap
        </Link>
      </div>
    );
  }

  if (user.role !== "teacher") {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
          Öğretmen paneli
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          Bu alan öğretmen hesapları için. Başvuru yapmak ister misin?
        </p>
        <Link href="/ogretmen-ol" className="btn-primary mt-8 inline-flex">
          Öğretmen ol
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        Öğretmen
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-6xl">
        Merhaba {user.name}
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
        {teacher
          ? `${teacher.title} · ${teacher.subjects.join(" · ")} · Demo profil: ${teacher.name}`
          : "Ders takvimin ve öğrenci notların burada."}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Yaklaşan" value={String(upcoming.length)} />
        <Stat label="Tamamlanan" value={String(completed.length)} />
        <Stat
          label="Saatlik"
          value={
            teacher
              ? new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(teacher.hourlyRate)
              : "—"
          }
        />
      </div>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Yaklaşan dersler
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--ink-muted)]">
            Henüz öğrenci rezervasyonu yok. Profilin katalogda görünüyor.
          </p>
        ) : (
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
                    {lesson.studentName} · {lesson.slot}
                  </p>
                  {lesson.note && (
                    <p className="mt-2 text-sm text-[var(--ink)]">
                      Öğrenci notu: {lesson.note}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => completeLesson(lesson.id)}
                    className="btn-ghost text-sm"
                  >
                    Tamamlandı işaretle
                  </button>
                  <Link href={`/ders/${lesson.id}`} className="btn-primary text-sm">
                    Derse başla
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {teacher && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            Müsaitlik
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {teacher.availability.map((slot) => (
              <li
                key={slot}
                className="rounded-xl bg-white/70 px-3 py-2 text-sm text-[var(--ink)] ring-1 ring-[var(--line)]"
              >
                {slot}
              </li>
            ))}
          </ul>
          <Link
            href={`/ogretmenler/${teacher.id}`}
            className="mt-6 inline-flex text-sm text-[var(--accent-deep)] underline-offset-2 hover:underline"
          >
            Genel profili gör
          </Link>
        </section>
      )}
    </div>
  );
}
