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

export type UserRole = "student" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teacherId?: string;
}

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

export interface BookedLesson {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  subject: Subject;
  date: string;
  time: string;
  slot: string;
  note?: string;
  status: "upcoming" | "completed" | "cancelled";
  meetingUrl: string;
  createdAt: string;
}
