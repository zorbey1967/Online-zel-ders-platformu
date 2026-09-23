import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--mist)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            Birebir
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mist)]/70">
            Doğru öğretmenle, doğru saatte. Canlı video ile birebir özel ders.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]/50">
            Keşfet
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/ogretmenler" className="hover:text-white">
                Öğretmenler
              </Link>
            </li>
            <li>
              <Link href="/#nasil" className="hover:text-white">
                Nasıl çalışır
              </Link>
            </li>
            <li>
              <Link href="/panel" className="hover:text-white">
                Öğrenci paneli
              </Link>
            </li>
            <li>
              <Link href="/ogretmen-ol" className="hover:text-white">
                Öğretmen ol
              </Link>
            </li>
            <li>
              <Link href="/giris" className="hover:text-white">
                Giriş
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--mist)]/50">
            Destek
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--mist)]/80">
            <li>destek@birebir.app</li>
            <li>Hafta içi 09:00–22:00</li>
            <li>İstanbul · Online</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[var(--mist)]/45 md:px-8">
        © {new Date().getFullYear()} Birebir. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
