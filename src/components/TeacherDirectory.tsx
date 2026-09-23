"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { TeacherCard } from "@/components/TeacherCard";
import { subjects, teachers } from "@/data/teachers";
import type { Subject } from "@/lib/types";

export function TeacherDirectory() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Tümü");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return teachers.filter((t) => {
      const matchSubject =
        subject === "Tümü" || t.subjects.includes(subject as Subject);
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.subjects.some((s) => s.toLowerCase().includes(q)) ||
        t.highlights.some((h) => h.toLowerCase().includes(q));
      return matchSubject && matchQuery;
    });
  }, [deferredQuery, subject]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <label className="block w-full max-w-md space-y-2">
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Ara
          </span>
          <input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              startTransition(() => setQuery(value));
            }}
            placeholder="Öğretmen, ders veya konu"
            className="field"
          />
        </label>
        <p className="text-sm text-[var(--ink-muted)]">
          {isPending ? "Filtreleniyor…" : `${filtered.length} öğretmen`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subjects.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => startTransition(() => setSubject(item))}
            className={`rounded-xl px-3.5 py-2 text-sm transition ${
              subject === item
                ? "bg-[var(--ink)] text-[var(--mist)]"
                : "bg-white/60 text-[var(--ink-muted)] ring-1 ring-[var(--line)] hover:text-[var(--ink)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div
        className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
          isPending ? "opacity-70" : "opacity-100"
        } transition-opacity`}
      >
        {filtered.map((teacher, index) => (
          <TeacherCard key={teacher.id} teacher={teacher} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-[var(--ink-muted)]">
          Bu aramaya uygun öğretmen bulunamadı.
        </p>
      )}
    </div>
  );
}
