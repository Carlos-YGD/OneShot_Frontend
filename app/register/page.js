"use client";

import { useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await register(email, username, password);
    if (success) router.push("/profile");
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-[#f8eed5] min-w-md max-w-xl p-6 border border-[#4f4735] shadow-[2px_2px_0_#000]">
        <h1 className="text-center font-bold text-xl mb-2">Register</h1>
        <p className="text-center mb-1">Welcome!</p>
        <p className="text-center mb-4">Enter your info to create your account!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="px-3 py-2 border border-[#4f4735] shadow-[2px_2px_0_#000]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="px-3 py-2 border border-[#4f4735] shadow-[2px_2px_0_#000]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#e3be87] border border-[#4f4735] shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
