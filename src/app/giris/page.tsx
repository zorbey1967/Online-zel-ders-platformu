import type { Metadata } from "next";
import { AuthPage } from "@/components/AuthPage";

export const metadata: Metadata = {
  title: "Giriş",
};

export default function GirisPage() {
  return <AuthPage mode="giris" />;
}
