import type { Metadata } from "next";
import { AuthPage } from "@/components/AuthPage";

export const metadata: Metadata = {
  title: "Kayıt",
};

export default function KayitPage() {
  return <AuthPage mode="kayit" />;
}
