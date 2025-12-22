import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function NavBar() {
  const { user, logout, checkAdminStatus } = useAuthStore();
  const [adminStatus, setAdminStatus] = useState({ is_admin: false, is_staff: false });

  useEffect(() => {
    if (user) {
      checkAdminStatus().then(setAdminStatus);
    }
  }, [user]);

  return (
    <nav className="bg-[#f8eed5] border-b border-[#4f4735] h-16">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-6">       
                <Link className="font-bold
                px-4 py-2
                bg-[#e9d196]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
                " href="/menu">Menu</Link>
                {user && <Link className="font-bold
                px-4 py-2
                bg-[#e9d196]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
                " href="/profile" onClick={() => console.log("[NavBar] profile link clicked, user:", user?.id)}>Profile</Link>}
                <Link className="font-bold
                px-4 py-2
                bg-[#e9d196]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
                " href="/tutorial">Tutorial</Link>

                {user && (adminStatus.is_admin || adminStatus.is_staff) && (
                <Link className="font-bold
                px-4 py-2
                bg-[#e3be87]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
                " href="/dashboard">Admin Dashboard</Link>
                )}
                {!user && (
                        <>
                        <Link
                            className="font-bold px-4 py-2 bg-[#e3be87] border border-[#4f4735] shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            href="/login"
                        >
                            Login
                        </Link>

                        <Link
                            className="font-bold px-4 py-2 bg-[#e3be87] border border-[#4f4735] shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            href="/register"
                        >
                            Register
                        </Link>
                        </>
                    )}
                {user && <button className="font-bold
                px-4 py-2
                bg-[#c8a389]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
                " onClick={logout}>Logout</button>}
                {user && <span className="underline">Welcome, {user.username}</span>}

            </div>
        </div>
    </nav>
  );
}
