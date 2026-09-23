"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";

export function StudentPanel() {
  const router = useRouter();
  const { user, lessons, ready, cancelLesson } = useApp();

  useEffect(() => {
    if (ready && user?.role === "teacher") {
      router.replace("/ogretmen-panel");
    }
  }, [ready, user, router]);

  const mine = useMemo(() => {
    if (!user) return [];
    return lessons.filter((l) => l.studentId === user.id);
  }, [lessons, user]);

  const upcoming = mine.filter((l) => l.status === "upcoming");
  const past = mine.filter((l) => l.status === "completed");
  const cancelled = mine.filter((l) => l.status === "cancelled");

  if (!ready || user?.role === "teacher") {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <p className="text-[var(--ink-muted)]">Yükleniyor…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
          Panelim
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          Derslerini görmek için giriş yap.
        </p>
        <Link href="/giris?next=/panel" className="btn-primary mt-8 inline-flex">
          Giriş yap
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        Öğrenci
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-6xl">
        Panelim
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-muted)]">
        Merhaba {user.name}. Yaklaşan canlı derslerin ve geçmiş oturumların burada.
      </p>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Yaklaşan dersler
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--ink-muted)]">
            Henüz yaklaşan dersin yok.{" "}
            <Link href="/ogretmenler" className="text-[var(--accent-deep)] underline-offset-2 hover:underline">
              Öğretmen keşfet
            </Link>
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
                    {lesson.teacherName} · {lesson.slot}
                  </p>
                  {lesson.note && (
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">Not: {lesson.note}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/ogretmenler/${lesson.teacherId}`}
                    className="btn-ghost text-sm"
                  >
                    Profil
                  </Link>
                  <button
                    type="button"
                    onClick={() => cancelLesson(lesson.id)}
                    className="btn-ghost text-sm"
                  >
                    İptal
                  </button>
                  <Link href={`/ders/${lesson.id}`} className="btn-primary text-sm">
                    Derse katıl
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Tamamlanan
        </h2>
        {past.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--ink-muted)]">Tamamlanan ders yok.</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {past.map((lesson) => (
              <li
                key={lesson.id}
                className="flex flex-col gap-1 rounded-2xl px-5 py-4 text-sm ring-1 ring-[var(--line)] sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-[var(--ink)]">
                  {lesson.subject} · {lesson.teacherName}
                </span>
                <span className="text-[var(--ink-muted)]">{lesson.slot}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {cancelled.length > 0 && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            İptal edilen
          </h2>
          <ul className="mt-6 space-y-3">
            {cancelled.map((lesson) => (
              <li
                key={lesson.id}
                className="rounded-2xl px-5 py-4 text-sm text-[var(--ink-muted)] ring-1 ring-[var(--line)]"
              >
                {lesson.subject} · {lesson.teacherName} · {lesson.slot}
              </li>
            ))}
          </ul>
        </section>
      )}

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
