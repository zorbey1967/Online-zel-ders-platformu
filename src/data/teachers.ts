import type { BookedLesson, Teacher } from "@/lib/types";

export const teachers: Teacher[] = [
  {
    id: "ayse-kaya",
    name: "Ayşe Kaya",
    title: "Matematik & Geometri",
    subjects: ["Matematik"],
    levels: ["Ortaokul", "Lise"],
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 450,
    experienceYears: 8,
    bio: "Boğaziçi Üniversitesi Matematik mezunu. LGS ve YKS öğrencilerine birebir, net artırmaya odaklı dersler veriyorum. İlk 15 dakikada seviye tespiti yapıp özel çalışma planı çıkarıyorum.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe", "İngilizce"],
    availability: ["Pzt 18:00", "Çar 19:00", "Cmt 10:00", "Paz 14:00"],
    highlights: ["YKS TYT Matematik", "LGS sayısal", "Geometri güçlendirme"],
  },
  {
    id: "mert-demir",
    name: "Mert Demir",
    title: "Fizik & Problem Çözme",
    subjects: ["Fizik", "Matematik"],
    levels: ["Lise", "Üniversite"],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 500,
    experienceYears: 6,
    bio: "ODTÜ Fizik mezunu. Formülleri ezberletmek yerine olayın mantığını kuruyoruz. AYT Fizik ve üniversite fizik derslerinde düzenli net artışı hedefliyorum.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe"],
    availability: ["Sal 17:30", "Per 20:00", "Cmt 11:00"],
    highlights: ["AYT Fizik", "Mekanik", "Elektrik"],
  },
  {
    id: "elif-yilmaz",
    name: "Elif Yılmaz",
    title: "İngilizce Konuşma & IELTS",
    subjects: ["İngilizce"],
    levels: ["Ortaokul", "Lise", "Yetişkin"],
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 420,
    experienceYears: 10,
    bio: "Cambridge CELTA sertifikalı eğitmen. Konuşma odaklı derslerde özgüveni yükseltmek önceliğim. IELTS Academic için band skoruna göre yol haritası çıkarıyorum.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe", "İngilizce"],
    availability: ["Pzt 09:00", "Çar 16:00", "Cum 18:30", "Paz 11:00"],
    highlights: ["IELTS 7.0+", "Speaking club", "Business English"],
  },
  {
    id: "can-ozturk",
    name: "Can Öztürk",
    title: "Yazılım & Algoritma",
    subjects: ["Yazılım"],
    levels: ["Lise", "Üniversite", "Yetişkin"],
    rating: 4.7,
    reviewCount: 71,
    hourlyRate: 550,
    experienceYears: 7,
    bio: "Full-stack yazılım mühendisi. Python, JavaScript ve veri yapıları derslerinde projeyle öğrenmeyi tercih ediyorum. Üniversite hazırlık ve kariyer geçişi için birebir mentoring.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe", "İngilizce"],
    availability: ["Sal 19:00", "Per 19:00", "Cmt 15:00"],
    highlights: ["Python", "React", "Algoritma"],
  },
  {
    id: "zeynep-arslan",
    name: "Zeynep Arslan",
    title: "Kimya & Biyoloji",
    subjects: ["Kimya", "Biyoloji"],
    levels: ["Lise"],
    rating: 4.9,
    reviewCount: 88,
    hourlyRate: 430,
    experienceYears: 9,
    bio: "Hacettepe Kimya öğretmenliği mezunu. Organik kimya ve hücre biyolojisini görselleştirerek anlatıyorum. Deneme analiziyle zayıf konuları hızla kapatıyoruz.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe"],
    availability: ["Pzt 17:00", "Çar 17:00", "Cum 16:00"],
    highlights: ["AYT Kimya", "Organik", "Biyoloji net"],
  },
  {
    id: "deniz-sahin",
    name: "Deniz Şahin",
    title: "Türkçe & Edebiyat",
    subjects: ["Türkçe", "Tarih"],
    levels: ["Ortaokul", "Lise"],
    rating: 4.8,
    reviewCount: 63,
    hourlyRate: 380,
    experienceYears: 5,
    bio: "Paragraf hızı, dil bilgisi ve edebiyat analizi üzerine çalışıyorum. Öğrencinin kendi sesiyle yazmasını hedefliyorum; ezber değil anlam kuruyoruz.",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=80",
    languages: ["Türkçe"],
    availability: ["Sal 18:00", "Per 18:00", "Paz 13:00"],
    highlights: ["Paragraf", "Dil bilgisi", "Edebiyat"],
  },
];

export const subjects = [
  "Tümü",
  "Matematik",
  "Fizik",
  "Kimya",
  "İngilizce",
  "Türkçe",
  "Biyoloji",
  "Yazılım",
  "Tarih",
] as const;

export const demoLessons: BookedLesson[] = [
  {
    id: "l1",
    teacherId: "ayse-kaya",
    teacherName: "Ayşe Kaya",
    subject: "Matematik",
    date: "25 Mart 2026",
    time: "18:00",
    status: "upcoming",
    meetingUrl: "https://meet.birebir.app/ayse-kaya-l1",
  },
  {
    id: "l2",
    teacherId: "elif-yilmaz",
    teacherName: "Elif Yılmaz",
    subject: "İngilizce",
    date: "27 Mart 2026",
    time: "16:00",
    status: "upcoming",
    meetingUrl: "https://meet.birebir.app/elif-yilmaz-l2",
  },
  {
    id: "l3",
    teacherId: "mert-demir",
    teacherName: "Mert Demir",
    subject: "Fizik",
    date: "18 Mart 2026",
    time: "17:30",
    status: "completed",
  },
];

export function getTeacher(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}
