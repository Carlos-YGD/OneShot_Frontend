"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user === null) return;
    if (!user.is_admin && !user.is_staff) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;
  if (!user.is_admin && !user.is_staff) return null;

  return <div>{children}</div>;
}
