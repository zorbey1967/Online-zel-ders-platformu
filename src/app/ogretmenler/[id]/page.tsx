import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { formatPrice, getTeacher, teachers } from "@/data/teachers";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return teachers.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const teacher = getTeacher(id);
  if (!teacher) return { title: "Öğretmen bulunamadı" };
  return {
    title: teacher.name,
    description: teacher.bio,
  };
}

export default async function TeacherDetailPage({ params }: Props) {
  const { id } = await params;
  const teacher = getTeacher(id);
  if (!teacher) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <Link
        href="/ogretmenler"
        className="text-sm text-[var(--ink-muted)] transition hover:text-[var(--ink)]"
      >
        ← Öğretmenlere dön
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
            <Image
              src={teacher.image}
              alt={teacher.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-8">
            <p className="text-sm text-[var(--accent-deep)]">
              {teacher.subjects.join(" · ")}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)] md:text-5xl">
              {teacher.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--ink-muted)]">{teacher.title}</p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink)]">
              <span>
                {teacher.rating.toFixed(1)} puan · {teacher.reviewCount} değerlendirme
              </span>
              <span>{teacher.experienceYears} yıl deneyim</span>
              <span>{formatPrice(teacher.hourlyRate)} / saat</span>
            </div>

            <p className="mt-8 max-w-2xl leading-relaxed text-[var(--ink-muted)]">
              {teacher.bio}
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                  Seviyeler
                </h2>
                <p className="mt-2 text-[var(--ink)]">{teacher.levels.join(", ")}</p>
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                  Diller
                </h2>
                <p className="mt-2 text-[var(--ink)]">{teacher.languages.join(", ")}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                Öne çıkan konular
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {teacher.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-white/70 px-3 py-1.5 text-sm text-[var(--ink)] ring-1 ring-[var(--line)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <BookingForm teacher={teacher} />
        </div>
      </div>
    </div>
  );
}
