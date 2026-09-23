"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";
import { demoLessons } from "@/data/teachers";
import {
  createId,
  loadLessons,
  loadUser,
  saveLessons,
  saveUser,
} from "@/lib/storage";
import type { BookedLesson, Subject, User, UserRole } from "@/lib/types";

interface BookLessonInput {
  teacherId: string;
  teacherName: string;
  subject: Subject;
  slot: string;
  note?: string;
}

interface AppContextValue {
  user: User | null;
  lessons: BookedLesson[];
  ready: boolean;
  isPending: boolean;
  login: (email: string, name?: string, role?: UserRole) => User;
  logout: () => void;
  bookLesson: (input: BookLessonInput) => BookedLesson | null;
  cancelLesson: (id: string) => void;
  completeLesson: (id: string) => void;
}

type StoreState = {
  user: User | null;
  lessons: BookedLesson[];
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readStore(): StoreState {
  const user = loadUser();
  const lessons = loadLessons();
  if (lessons.length > 0) return { user, lessons };
  if (user?.role === "student") {
    const seeded = seedLessons(user);
    saveLessons(seeded);
    return { user, lessons: seeded };
  }
  return { user, lessons: [] };
}

let cached: StoreState | null = null;

function getClientSnapshot(): StoreState {
  if (!cached) cached = readStore();
  return cached;
}

function getServerSnapshot(): StoreState {
  return { user: null, lessons: [] };
}

function setStore(next: StoreState) {
  cached = next;
  saveUser(next.user);
  saveLessons(next.lessons);
  emit();
}

function parseSlot(slot: string): { date: string; time: string } {
  const [dayPart, timePart] = slot.split(" ");
  const dayMap: Record<string, string> = {
    Pzt: "Pazartesi",
    Sal: "Salı",
    Çar: "Çarşamba",
    Per: "Perşembe",
    Cum: "Cuma",
    Cmt: "Cumartesi",
    Paz: "Pazar",
  };
  return {
    date: dayMap[dayPart] ?? dayPart,
    time: timePart ?? slot,
  };
}

function seedLessons(user: User): BookedLesson[] {
  return demoLessons.map((lesson) => ({
    id: lesson.id,
    teacherId: lesson.teacherId,
    teacherName: lesson.teacherName,
    studentId: user.id,
    studentName: user.name,
    subject: lesson.subject,
    date: lesson.date,
    time: lesson.time,
    slot: `${lesson.date} ${lesson.time}`,
    status: lesson.status,
    meetingUrl: lesson.meetingUrl ?? `https://meet.birebir.app/${lesson.id}`,
    createdAt: new Date().toISOString(),
  }));
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isPending, startTransition] = useTransition();
  const ready = typeof window !== "undefined";

  const login = useCallback(
    (email: string, name?: string, role: UserRole = "student") => {
      const existing = loadUser();
      const nextUser: User = {
        id: existing?.email === email ? existing.id : createId("user"),
        name: name?.trim() || email.split("@")[0] || "Öğrenci",
        email: email.trim().toLowerCase(),
        role,
        teacherId: role === "teacher" ? "ayse-kaya" : undefined,
      };
      const currentLessons = loadLessons();
      const nextLessons =
        currentLessons.length === 0 && role === "student"
          ? seedLessons(nextUser)
          : currentLessons;
      startTransition(() => {
        setStore({ user: nextUser, lessons: nextLessons });
      });
      return nextUser;
    },
    [],
  );

  const logout = useCallback(() => {
    startTransition(() => {
      setStore({ user: null, lessons: loadLessons() });
      saveUser(null);
      cached = { user: null, lessons: loadLessons() };
      emit();
    });
  }, []);

  const bookLesson = useCallback(
    (input: BookLessonInput) => {
      const current = getClientSnapshot();
      if (!current.user) return null;
      const { date, time } = parseSlot(input.slot);
      const lesson: BookedLesson = {
        id: createId("lesson"),
        teacherId: input.teacherId,
        teacherName: input.teacherName,
        studentId: current.user.id,
        studentName: current.user.name,
        subject: input.subject,
        date,
        time,
        slot: input.slot,
        note: input.note?.trim() || undefined,
        status: "upcoming",
        meetingUrl: `https://meet.birebir.app/${input.teacherId}-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
      };
      startTransition(() => {
        setStore({ user: current.user, lessons: [lesson, ...current.lessons] });
      });
      return lesson;
    },
    [],
  );

  const cancelLesson = useCallback((id: string) => {
    startTransition(() => {
      const current = getClientSnapshot();
      setStore({
        user: current.user,
        lessons: current.lessons.map((lesson) =>
          lesson.id === id ? { ...lesson, status: "cancelled" as const } : lesson,
        ),
      });
    });
  }, []);

  const completeLesson = useCallback((id: string) => {
    startTransition(() => {
      const current = getClientSnapshot();
      setStore({
        user: current.user,
        lessons: current.lessons.map((lesson) =>
          lesson.id === id ? { ...lesson, status: "completed" as const } : lesson,
        ),
      });
    });
  }, []);

  const value = useMemo(
    () => ({
      user: snapshot.user,
      lessons: snapshot.lessons,
      ready,
      isPending,
      login,
      logout,
      bookLesson,
      cancelLesson,
      completeLesson,
    }),
    [
      snapshot.user,
      snapshot.lessons,
      ready,
      isPending,
      login,
      logout,
      bookLesson,
      cancelLesson,
      completeLesson,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
