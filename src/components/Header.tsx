"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/ogretmenler", label: "Öğretmenler" },
  { href: "/#nasil", label: "Nasıl çalışır" },
  { href: "/panel", label: "Panelim" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)] transition-opacity hover:opacity-80"
        >
          Birebir
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
                  active
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
            className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-transform ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-transform ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--mist)]/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
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
