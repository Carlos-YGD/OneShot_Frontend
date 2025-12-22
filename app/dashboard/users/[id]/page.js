"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/services/api";
import Modal from "@/components/modal";

export default function UserEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}/`);
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading user...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: Number(value) },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch(`/users/${id}/`, user);
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}/`);
      alert("User deleted.");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const stats = user.stats || {};

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-[#f8eed5] min-w-md max-w-xl p-4 border border-[#4f4735] shadow-[2px_2px_0_#000]">
        <h1 className="font-bold text-center mb-4">Edit User: {user.username}</h1>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <strong>Username:</strong>
            <input
              value={user.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <strong>Email:</strong>
            <input
              value={user.email}
              disabled
              className="px-2 py-1 border border-black bg-[#ddd] shadow-[1px_1px_0_#000]"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={user.is_admin}
                onChange={(e) => handleChange("is_admin", e.target.checked)}
              />
              Admin
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={user.is_active}
                onChange={(e) => handleChange("is_active", e.target.checked)}
              />
              Active
            </label>
          </div>
        </div>

        <h2 className="font-bold mt-6 mb-2 flex justify-center">Stats</h2>
        <div className="flex flex-col gap-4">
          <fieldset className="p-2 border border-black shadow-[1px_1px_0_#000]">
            <legend className="font-bold">Versus Mode</legend>
            <div className="flex flex-col gap-2 mt-2">
              <label>
                P1 Wins:{" "}
                <input
                  type="number"
                  value={stats.p1_wins}
                  onChange={(e) => handleStatChange("p1_wins", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                P1 Losses:{" "}
                <input
                  type="number"
                  value={stats.p1_losses}
                  onChange={(e) => handleStatChange("p1_losses", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                P2 Wins:{" "}
                <input
                  type="number"
                  value={stats.p2_wins}
                  onChange={(e) => handleStatChange("p2_wins", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                P2 Losses:{" "}
                <input
                  type="number"
                  value={stats.p2_losses}
                  onChange={(e) => handleStatChange("p2_losses", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                Draws:{" "}
                <input
                  type="number"
                  value={stats.draws}
                  onChange={(e) => handleStatChange("draws", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                Versus Games Played:{" "}
                <input
                  type="number"
                  value={stats.versus_games_played}
                  onChange={(e) =>
                    handleStatChange("versus_games_played", e.target.value)
                  }
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="p-2 border border-black shadow-[1px_1px_0_#000]">
            <legend className="font-bold">Arcade Mode</legend>
            <div className="flex flex-col gap-2 mt-2">
              <label>
                Arcade Kills:{" "}
                <input
                  type="number"
                  value={stats.arcade_kills}
                  onChange={(e) => handleStatChange("arcade_kills", e.target.value)}
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                Arcade Victories:{" "}
                <input
                  type="number"
                  value={stats.arcade_victories}
                  onChange={(e) =>
                    handleStatChange("arcade_victories", e.target.value)
                  }
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                Arcade Losses:{" "}
                <input
                  type="number"
                  value={stats.arcade_losses}
                  onChange={(e) =>
                    handleStatChange("arcade_losses", e.target.value)
                  }
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
              <label>
                Arcade Games Played:{" "}
                <input
                  type="number"
                  value={stats.arcade_games_played}
                  onChange={(e) =>
                    handleStatChange("arcade_games_played", e.target.value)
                  }
                  className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="p-2 border border-black shadow-[1px_1px_0_#000]">
            <legend className="font-bold">Global</legend>
            <label>
              Total Games Played:{" "}
              <input
                type="number"
                value={stats.total_games_played}
                onChange={(e) =>
                  handleStatChange("total_games_played", e.target.value)
                }
                className="px-2 py-1 border border-black bg-[#fff3c4] shadow-[1px_1px_0_#000]"
              />
            </label>
          </fieldset>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-bold px-3 py-2 bg-[#e9d196] border border-[#4f4735] shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="font-bold px-3 py-2 bg-[#c25c5c] text-white border border-black shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000]"
          >
            Delete
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="font-bold px-3 py-2 bg-[#c8a389] border border-black shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000]"
          >
            Cancel
          </button>
        </div>

        {showDeleteConfirm && (
          <Modal title="Delete User" onClose={() => setShowDeleteConfirm(false)}>
            <p className="mb-3 font-bold">
              This will permanently delete this user.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className="font-bold px-3 py-1 bg-[#c25c5c] text-white border border-black shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000]"
                onClick={async () => {
                  await handleDelete();
                  setShowDeleteConfirm(false);
                }}
              >
                Delete
              </button>
              <button
                className="font-bold px-3 py-1 bg-[#e9d196] border border-black shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000]"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
