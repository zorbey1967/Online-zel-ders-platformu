export type Subject =
  | "Matematik"
  | "Fizik"
  | "Kimya"
  | "İngilizce"
  | "Türkçe"
  | "Biyoloji"
  | "Yazılım"
  | "Tarih";

export type Level = "İlkokul" | "Ortaokul" | "Lise" | "Üniversite" | "Yetişkin";

export interface Teacher {
  id: string;
  name: string;
  title: string;
  subjects: Subject[];
  levels: Level[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  experienceYears: number;
  bio: string;
  image: string;
  languages: string[];
  availability: string[];
  highlights: string[];
}

export interface LessonSlot {
  id: string;
  day: string;
  time: string;
}

export interface BookedLesson {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: Subject;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  meetingUrl?: string;
}
