import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/teachers";
import type { Teacher } from "@/lib/types";

export function TeacherCard({
  teacher,
  index = 0,
}: {
  teacher: Teacher;
  index?: number;
}) {
  return (
    <Link
      href={`/ogretmenler/${teacher.id}`}
      className="group teacher-card block overflow-hidden rounded-2xl bg-white/70 outline-none ring-1 ring-[var(--line)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:ring-[var(--accent)]/40 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-3 text-sm text-white/90">
          {formatPrice(teacher.hourlyRate)}
          <span className="text-white/60"> / saat</span>
        </p>
      </div>
      <div className="space-y-2 px-4 py-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            {teacher.name}
          </h3>
          <span className="shrink-0 text-sm text-[var(--ink-muted)]">
            {teacher.rating.toFixed(1)} · {teacher.reviewCount}
          </span>
        </div>
        <p className="text-sm text-[var(--ink-muted)]">{teacher.title}</p>
        <p className="text-xs tracking-wide text-[var(--accent-deep)]">
          {teacher.subjects.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
