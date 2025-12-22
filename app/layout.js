"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function RootLayout({ children }) {
  const fetchProfile = useAuthStore((s) => s.fetchProfile);
  const user = useAuthStore((s) => s.user);
  const isLoggingOut = useAuthStore((s) => s.isLoggingOut);
  const pathname = usePathname();
  const router = useRouter();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    const normalizedPath = pathname.replace(/\/$/, "");

    if (publicRoutes.includes(normalizedPath) || isLoggingOut) {
      setIsFetched(true);
      return;
    }

    const loadUser = async () => {
      if (isLoggingOut) {
        setIsFetched(true);
        return;
      }
      try {
        console.log("[layout] loadUser: fetching profile");
        await fetchProfile();
        console.log("[layout] loadUser: fetch complete, user:", useAuthStore.getState().user?.id);
      } finally {
        setIsFetched(true);
      }
    };
    loadUser();
  }, [fetchProfile, pathname, isLoggingOut]);

  useEffect(() => {
    if (!isFetched) return;
    const protectedRoutes = ["/dashboard", "/profile",];
    const normalizedPath = pathname.replace(/\/$/, "");
    console.log("[layout] check redirect:", { normalizedPath, isFetched, userId: user?.id, isLoggingOut });
    if (protectedRoutes.includes(normalizedPath) && (user === null || isLoggingOut)) {
      console.log("[layout] redirecting to /login because user is null or logging out");
      router.replace("/login");
    }
  }, [isFetched, user, pathname, router, isLoggingOut]);

  if (!isFetched) {
    return (
      <html lang="en">
        <body>
          <p>Loading...</p>
        </body>
      </html>
      
    );
  }

  return (
    <>
      <NavBar />
      <body>{children}</body>
    </>
  );
}
