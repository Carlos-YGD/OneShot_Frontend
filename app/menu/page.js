"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function MenuPage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const handleStartGame = () => {
  window.location.href = "/game";
};

  if (loading) return null;

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <main className="flex items-center justify-center mt-70">
      <button
        onClick={handleStartGame}
        className="px-6 py-3 text-lg font-semibold border rounded-md
                   hover:bg-white hover:text-black transition"
      >
        Start Game
      </button>
    </main>
  );
}
