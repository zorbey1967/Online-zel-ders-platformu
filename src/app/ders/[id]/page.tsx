"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function LessonRoomPage() {
  const params = useParams<{ id: string }>();
  const { lessons, ready, user, completeLesson } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const lesson = useMemo(
    () => lessons.find((l) => l.id === params.id),
    [lessons, params.id],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const clock = useMemo(() => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [seconds]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28 text-[var(--ink-muted)]">
        Yükleniyor…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
          Derse katılmak için giriş yap
        </h1>
        <Link
          href={`/giris?next=/ders/${params.id}`}
          className="btn-primary mt-6 inline-flex"
        >
          Giriş
        </Link>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
          Ders bulunamadı
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">
          Rezervasyon silinmiş veya henüz senin hesabında değil.
        </p>
        <Link href="/panel" className="btn-primary mt-6 inline-flex">
          Panele dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 md:px-8 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
            Canlı ders
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-4xl">
            {lesson.subject}
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            {lesson.teacherName} · {lesson.studentName} · {lesson.slot}
          </p>
        </div>
        <p className="font-mono text-lg text-[var(--ink)]">{clock}</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-[var(--ink)] md:min-h-[420px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,93,4,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(158,197,216,0.25),transparent_40%)]" />
          <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center px-6 text-center text-[var(--mist)] md:min-h-[420px]">
            <p className="font-[family-name:var(--font-display)] text-3xl">
              {cameraOff ? "Kamera kapalı" : "Demo video odası"}
            </p>
            <p className="mt-3 max-w-md text-sm text-[var(--mist)]/70">
              Gerçek WebRTC yerine görsel bir ders odası. Ses{" "}
              {muted ? "kapalı" : "açık"}.
            </p>
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setMuted((v) => !v)}
              className="rounded-xl bg-white/15 px-4 py-2 text-sm text-white backdrop-blur"
            >
              {muted ? "Sesi aç" : "Sessize al"}
            </button>
            <button
              type="button"
              onClick={() => setCameraOff((v) => !v)}
              className="rounded-xl bg-white/15 px-4 py-2 text-sm text-white backdrop-blur"
            >
              {cameraOff ? "Kamerayı aç" : "Kamerayı kapat"}
            </button>
            <button
              type="button"
              onClick={() => completeLesson(lesson.id)}
              className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
            >
              Dersi bitir
            </button>
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl bg-white/70 p-5 ring-1 ring-[var(--line)]">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            Ders özeti
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[var(--ink-muted)]">Konu</dt>
              <dd className="text-[var(--ink)]">{lesson.subject}</dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Saat</dt>
              <dd className="text-[var(--ink)]">{lesson.slot}</dd>
            </div>
            {lesson.note && (
              <div>
                <dt className="text-[var(--ink-muted)]">Öğrenci notu</dt>
                <dd className="text-[var(--ink)]">{lesson.note}</dd>
              </div>
            )}
            <div>
              <dt className="text-[var(--ink-muted)]">Durum</dt>
              <dd className="text-[var(--ink)]">
                {lesson.status === "upcoming"
                  ? "Devam ediyor"
                  : lesson.status === "completed"
                    ? "Tamamlandı"
                    : "İptal"}
              </dd>
            </div>
          </dl>
          <Link
            href={user.role === "teacher" ? "/ogretmen-panel" : "/panel"}
            className="btn-ghost inline-flex text-sm"
          >
            Panele dön
          </Link>
        </aside>
      </div>
    </div>
  );
}
