import { useState, useEffect } from "react";
import api from "@/services/api";

export default function useUsers({ user, page, pageSize, search, filter, sort }) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let mounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          page_size: pageSize,
          search: search || undefined,
          is_admin: filter.is_admin || undefined,
          is_staff: filter.is_staff || undefined,
          is_active:
            filter.status === "Active"
              ? true
              : filter.status === "Inactive"
              ? false
              : undefined,
          ordering: sort.direction === "asc" ? sort.field : `-${sort.field}`,
        };
        const { data } = await api.get("/users/", { params });

        if (mounted) {
          setUsers(data.results);
          setTotalPages(Math.ceil(data.count / pageSize));
        }
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => (mounted = false);
  }, [user, page, pageSize, search, filter, sort]);

  return { users, totalPages, loading };
}
