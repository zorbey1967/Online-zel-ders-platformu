"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import type { UserRole } from "@/lib/types";

function AuthForm({ mode }: { mode: "giris" | "kayit" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/panel";
  const { login } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const user = login(email, mode === "kayit" ? name : undefined, role);
      const dest =
        next !== "/panel"
          ? next
          : user.role === "teacher"
            ? "/ogretmen-panel"
            : "/panel";
      router.push(dest);
    });
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-28 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        Hesap
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">
        {mode === "giris" ? "Giriş yap" : "Kayıt ol"}
      </h1>
      <p className="mt-3 text-sm text-[var(--ink-muted)]">
        Demo için şifre gerekmez. E-posta ile oturum açılır ve tarayıcıda saklanır.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {mode === "kayit" && (
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
              Ad soyad
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              placeholder="Ayşe Öğrenci"
            />
          </label>
        )}
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
            placeholder="sen@ornek.com"
          />
        </label>
        <fieldset className="space-y-2">
          <legend className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Rol
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["student", "Öğrenci"],
                ["teacher", "Öğretmen"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`rounded-xl px-3 py-2.5 text-sm transition ${
                  role === value
                    ? "bg-[var(--ink)] text-[var(--mist)]"
                    : "bg-[var(--fog)] text-[var(--ink)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <button type="submit" disabled={isPending} className="btn-primary w-full">
          {isPending
            ? "Bekle…"
            : mode === "giris"
              ? "Giriş yap"
              : "Hesap oluştur"}
        </button>
      </form>

      <p className="mt-6 text-sm text-[var(--ink-muted)]">
        {mode === "giris" ? (
          <>
            Hesabın yok mu?{" "}
            <Link
              href={`/kayit?next=${encodeURIComponent(next)}`}
              className="text-[var(--accent-deep)] underline-offset-2 hover:underline"
            >
              Kayıt ol
            </Link>
          </>
        ) : (
          <>
            Zaten üye misin?{" "}
            <Link
              href={`/giris?next=${encodeURIComponent(next)}`}
              className="text-[var(--accent-deep)] underline-offset-2 hover:underline"
            >
              Giriş yap
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export function AuthPage({ mode }: { mode: "giris" | "kayit" }) {
  return (
    <Suspense
      fallback={
        <div className="px-5 py-28 text-[var(--ink-muted)]">Yükleniyor…</div>
      }
    >
      <AuthForm mode={mode} />
    </Suspense>
  );
}
