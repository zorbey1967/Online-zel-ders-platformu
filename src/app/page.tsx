import Image from "next/image";
import Link from "next/link";
import { TeacherCard } from "@/components/TeacherCard";
import { teachers } from "@/data/teachers";

const steps = [
  {
    title: "Öğretmenini seç",
    text: "Ders, seviye ve bütçene göre filtrele. Profil, puan ve müsait saatleri incele.",
  },
  {
    title: "Saatini ayırt",
    text: "Uygun slotu seç, hedefini yaz. Rezervasyon anında paneline düşer.",
  },
  {
    title: "Canlı derse bağlan",
    text: "Tek tıkla video odasına gir. Ders sonrası özet ve sonraki adımlar seninle.",
  },
];

export default function Home() {
  const featured = teachers.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80"
            alt="Öğrenci ve öğretmen birlikte çalışan bir çalışma masası"
            fill
            priority
            className="hero-drift object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,44,36,0.82)_0%,rgba(15,44,36,0.55)_42%,rgba(15,44,36,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(232,93,4,0.22),transparent_45%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32">
          <p className="reveal font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-white sm:text-6xl md:text-8xl">
            Birebir
          </p>
          <h1 className="reveal reveal-delay-1 mt-5 max-w-xl font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-white/95 sm:text-3xl md:text-4xl">
            Doğru öğretmenle, canlı özel ders.
          </h1>
          <p className="reveal reveal-delay-2 mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
            Matematikten İngilizceye, yazılıma. Seviyene uygun öğretmeni bul, tek
            tıkla derse bağlan.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="/ogretmenler" className="btn-primary">
              Öğretmen keşfet
            </Link>
            <Link
              href="/#nasil"
              className="btn-ghost border-white/35 text-white hover:bg-white/10"
            >
              Nasıl çalışır?
            </Link>
          </div>
        </div>
      </section>

      <section
        id="nasil"
        className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
          Akış
        </p>
        <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-5xl">
          Üç adımda birebir ders.
        </h2>
        <p className="mt-4 max-w-lg text-[var(--ink-muted)]">
          Karmaşık paneller yok. Seç, ayırt, derse gir.
        </p>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="font-[family-name:var(--font-display)] text-5xl text-[var(--fog)]">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--line)] bg-white/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                Öne çıkanlar
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] md:text-5xl">
                Bu haftanın öğretmenleri
              </h2>
            </div>
            <Link
              href="/ogretmenler"
              className="text-sm font-medium text-[var(--accent-deep)] underline-offset-4 hover:underline"
            >
              Tümünü gör
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((teacher, index) => (
              <TeacherCard key={teacher.id} teacher={teacher} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              alt="Laptop üzerinden online ders alan öğrenci"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              Neden Birebir
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--ink)] md:text-5xl">
              Sınıf değil, senin temposun.
            </h2>
            <p className="mt-5 text-[var(--ink-muted)] leading-relaxed">
              Her ders 50 dakika, kayıtlı öğretmenlerle, video üzerinden. Zayıf
              konuyu seç, hedef netini söyle; öğretmenin sana özel plan
              çıkarır.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--ink)]">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                Doğrulanmış öğretmen profilleri ve puanlar
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                Anlık rezervasyon ve panelden ders linki
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                LGS, YKS, IELTS ve kariyer odaklı dersler
              </li>
            </ul>
            <Link href="/panel" className="btn-primary mt-10 inline-flex">
              Panele git
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
