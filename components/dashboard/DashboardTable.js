import { useRouter } from "next/navigation";

export default function DashboardTable({ users }) {
  const router = useRouter();

  if (users.length === 0) return <p>No users found.</p>;

  return (
    <table className="w-full border-collapse border border-[#4f4735] bg-[#f8eed5] shadow-[2px_2px_0_#000]">
      <thead>
        <tr>
          <th className="border px-2 py-1 bg-[#e9d196]">ID</th>
          <th className="border px-2 py-1 bg-[#e9d196]">Email</th>
          <th className="border px-2 py-1 bg-[#e9d196]">Username</th>
          <th className="border px-2 py-1 bg-[#e9d196]">Admin</th>
          <th className="border px-2 py-1 bg-[#e9d196]">Staff</th>
          <th className="border px-2 py-1 bg-[#e9d196]">Active</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="cursor-pointer hover:bg-[#c8a389]" onClick={() => router.push(`/dashboard/users/${u.id}`)}>
            <td className="border px-2 py-1">{u.id}</td>
            <td className="border px-2 py-1">{u.email}</td>
            <td className="border px-2 py-1">{u.username}</td>
            <td className="border px-2 py-1">{u.is_admin ? "Yes" : "No"}</td>
            <td className="border px-2 py-1">{u.is_staff ? "Yes" : "No"}</td>
            <td className="border px-2 py-1">{u.is_active ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
