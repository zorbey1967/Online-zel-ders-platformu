"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout, ready } = useApp();
  const onHero = pathname === "/";

  const links = [
    { href: "/ogretmenler", label: "Öğretmenler" },
    { href: "/#nasil", label: "Nasıl çalışır" },
    {
      href: user?.role === "teacher" ? "/ogretmen-panel" : "/panel",
      label: user?.role === "teacher" ? "Öğretmen paneli" : "Panelim",
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8 ${
          onHero ? "text-white" : "text-[var(--ink)]"
        }`}
      >
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80 ${
            onHero ? "text-white" : "text-[var(--ink)]"
          }`}
        >
          Birebir
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active =
              link.href.startsWith("/") &&
              !link.href.includes("#") &&
              pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  onHero
                    ? active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {ready && user ? (
            <div className="flex items-center gap-3">
              <span
                className={`max-w-[9rem] truncate text-sm ${
                  onHero ? "text-white/75" : "text-[var(--ink-muted)]"
                }`}
              >
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className={
                  onHero
                    ? "btn-ghost border-white/35 text-sm text-white hover:bg-white/10"
                    : "btn-ghost text-sm"
                }
              >
                Çıkış
              </button>
            </div>
          ) : (
            <Link
              href="/giris"
              className={
                onHero
                  ? "btn-ghost border-white/35 text-sm text-white hover:bg-white/10"
                  : "btn-ghost text-sm"
              }
            >
              Giriş
            </Link>
          )}
          <Link href="/ogretmenler" className="btn-primary text-sm">
            Ders bul
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menüyü aç"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-5 transition-transform ${
              onHero ? "bg-white" : "bg-[var(--ink)]"
            } ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-0.5 w-5 transition-opacity ${
              onHero ? "bg-white" : "bg-[var(--ink)]"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-0.5 w-5 transition-transform ${
              onHero ? "bg-white" : "bg-[var(--ink)]"
            } ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--mist)]/95 px-5 py-4 text-[var(--ink)] backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {link.label}
              </Link>
            ))}
            {ready && user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="py-2 text-left"
              >
                Çıkış ({user.name})
              </button>
            ) : (
              <Link href="/giris" onClick={() => setOpen(false)} className="py-2">
                Giriş
              </Link>
            )}
            <Link
              href="/ogretmenler"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-center text-sm"
            >
              Ders bul
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
