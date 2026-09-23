"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { useApp } from "@/context/AppContext";
import { createId, loadTeacherApps, saveTeacherApps } from "@/lib/storage";

export function TeacherApplyForm() {
  const { user } = useApp();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [subjects, setSubjects] = useState("Matematik");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const apps = loadTeacherApps();
      apps.unshift({
        id: createId("app"),
        name,
        email,
        subjects,
        experience,
        bio,
        createdAt: new Date().toISOString(),
      });
      saveTeacherApps(apps);
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-[var(--ink)] px-6 py-10 text-[var(--mist)]">
        <p className="font-[family-name:var(--font-display)] text-3xl">
          Başvurun alındı
        </p>
        <p className="mt-3 text-sm text-[var(--mist)]/70">
          Ekip profilini inceledikten sonra e-posta ile dönüş yapacak. Demo için
          öğretmen rolüyle giriş yaparak paneli hemen deneyebilirsin.
        </p>
        <Link
          href="/giris?next=/ogretmen-panel"
          className="btn-primary mt-8 inline-flex"
        >
          Öğretmen olarak giriş
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Ad soyad
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          E-posta
        </span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Dersler
        </span>
        <input
          required
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          className="field"
          placeholder="Matematik, Fizik"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Deneyim
        </span>
        <input
          required
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="field"
          placeholder="5 yıl LGS / YKS"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          Kısa bio
        </span>
        <textarea
          required
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="field resize-none"
        />
      </label>
      <button type="submit" disabled={isPending} className="btn-primary">
        {isPending ? "Gönderiliyor…" : "Başvuruyu gönder"}
      </button>
    </form>
  );
}
