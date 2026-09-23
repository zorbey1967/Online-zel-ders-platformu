"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/teachers";
import type { Subject, Teacher } from "@/lib/types";

export function BookingForm({ teacher }: { teacher: Teacher }) {
  const router = useRouter();
  const { user, bookLesson } = useApp();
  const [subject, setSubject] = useState<Subject>(teacher.subjects[0]);
  const [slot, setSlot] = useState(teacher.availability[0] ?? "");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const total = useMemo(() => teacher.hourlyRate, [teacher.hourlyRate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      router.push(`/giris?next=/ogretmenler/${teacher.id}`);
      return;
    }
    startTransition(() => {
      const lesson = bookLesson({
        teacherId: teacher.id,
        teacherName: teacher.name,
        subject,
        slot,
        note,
      });
      if (!lesson) return;
      setDone(true);
      window.setTimeout(() => {
        router.push("/panel");
      }, 1100);
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-[var(--ink)] px-6 py-8 text-[var(--mist)]">
        <p className="font-[family-name:var(--font-display)] text-2xl">
          Rezervasyon alındı
        </p>
        <p className="mt-2 text-sm text-[var(--mist)]/70">
          {teacher.name} ile {slot} tarihli {subject} dersin panelinde hazır.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl bg-white/80 p-6 ring-1 ring-[var(--line)]"
    >
      <div>
        <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Ders ayırt
        </p>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          50 dakikalık canlı video ders · {formatPrice(total)}
        </p>
      </div>

      {!user && (
        <p className="rounded-xl bg-[var(--fog)] px-3 py-2 text-sm text-[var(--ink-muted)]">
          Rezervasyon için{" "}
          <Link
            href={`/giris?next=/ogretmenler/${teacher.id}`}
            className="font-medium text-[var(--accent-deep)] underline-offset-2 hover:underline"
          >
            giriş yap
          </Link>
          .
        </p>
      )}

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Ders
        </span>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="field"
        >
          {teacher.subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="space-y-2">
        <legend className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Uygun saat
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {teacher.availability.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSlot(item)}
              className={`rounded-xl px-3 py-2.5 text-left text-sm transition ${
                slot === item
                  ? "bg-[var(--ink)] text-[var(--mist)]"
                  : "bg-[var(--fog)] text-[var(--ink)] hover:bg-[var(--line)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Not (isteğe bağlı)
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Örn. Türev konusunda takılıyorum"
          className="field resize-none"
        />
      </label>

      <button type="submit" disabled={isPending || !slot} className="btn-primary w-full">
        {isPending
          ? "Kaydediliyor…"
          : user
            ? "Rezervasyonu onayla"
            : "Giriş yap ve ayırt"}
      </button>
    </form>
  );
}
