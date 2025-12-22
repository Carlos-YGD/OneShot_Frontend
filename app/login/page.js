"use client";

import { useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(email, password);
    if (success) router.push("/profile");
  }

  return (
  <div className="flex justify-center mt-5">
    <div className="bg-[#f8eed5] min-w-md max-w-xl p-4 border border-[#4f4735] shadow-[2px_2px_0_#000]">
      <h1 className="text-center font-bold text-xl mb-2">Login</h1>
      <p className="text-center mb-1">Welcome back!</p>
      <p className="text-center mb-4">Enter your info to login!</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="px-3 py-2 border border-[#4f4735] shadow-[2px_2px_0_#000]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          className="px-3 py-2 border border-[#4f4735] shadow-[2px_2px_0_#000]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          className="px-4 py-2 bg-[#e3be87] border border-[#4f4735] shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>
);
}
