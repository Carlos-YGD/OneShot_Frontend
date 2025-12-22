"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import useUsers from "@/services/useUsers";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import DashboardTable from "@/components/dashboard/DashboardTable";
import Pagination from "@/components/dashboard/Pagination";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ is_admin: false, is_staff: false, status: "All" });
  const [sort, setSort] = useState({ field: "id", direction: "asc" });

  useEffect(() => {
    if (!user) router.push("/login");
    else if (!user.is_admin && !user.is_staff) router.push("/");
  }, [user, router]);

  const { users, totalPages, loading } = useUsers({ user, page, pageSize, search, filter, sort });

  const resetFilters = () => {
    setSearch("");
    setFilter({ is_admin: false, is_staff: false, status: "All" });
    setSort({ field: "id", direction: "asc" });
    setPage(1);
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <div className="bg-amber-100">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Admin Dashboard</h1>
        <DashboardFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} resetFilters={resetFilters} />
        <DashboardTable users={users} />
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
