import type { BookedLesson, User } from "@/lib/types";

const USER_KEY = "birebir:user";
const LESSONS_KEY = "birebir:lessons";
const TEACHER_APPS_KEY = "birebir:teacher-apps";

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadUser(): User | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User | null) {
  if (!canUseStorage()) return;
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadLessons(): BookedLesson[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(LESSONS_KEY);
    return raw ? (JSON.parse(raw) as BookedLesson[]) : [];
  } catch {
    return [];
  }
}

export function saveLessons(lessons: BookedLesson[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
}

export interface TeacherApplication {
  id: string;
  name: string;
  email: string;
  subjects: string;
  experience: string;
  bio: string;
  createdAt: string;
}

export function loadTeacherApps(): TeacherApplication[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(TEACHER_APPS_KEY);
    return raw ? (JSON.parse(raw) as TeacherApplication[]) : [];
  } catch {
    return [];
  }
}

export function saveTeacherApps(apps: TeacherApplication[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(TEACHER_APPS_KEY, JSON.stringify(apps));
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
