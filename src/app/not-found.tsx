import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-5 pt-24 md:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-5xl text-[var(--ink)]">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 text-[var(--ink-muted)]">
        Aradığın içerik taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
