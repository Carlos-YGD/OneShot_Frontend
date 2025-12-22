"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/components/modal";

export default function ProfilePage() {
  const { user, updateUsername, resetStats, deleteAccount, loading, error } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return <p>Loading profile...</p>;

  const stats = user.stats || {};

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-[#f8eed5] min-w-md
    max-w-xl
    p-4 border border-[#4f4735] shadow-[2px_2px_0_#000]">
        <h1 className="font-bold justify-self-center">Profile</h1>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <strong>Username:</strong>

            {!editing ? (
              <span>{user.username}</span>
            ) : (
              <input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="
                  px-2 py-1
                  border border-black
                  bg-[#fff3c4]
                  shadow-[1px_1px_0_#000]
                  focus:outline-none
                "
              />
            )}
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="
                font-bold
                px-2 py-1
                bg-[#e9d196]
                border border-[#4f4735]
                shadow-[2px_2px_0_#000]
                hover:shadow-[1px_1px_0_#000]
                hover:translate-x-[1px] hover:translate-y-[1px]
                active:shadow-none
                active:translate-x-[2px] active:translate-y-[2px]
              "
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                disabled={loading}
                onClick={async () => {
                  const success = await updateUsername(newUsername);
                  if (success) setEditing(false);
                }}
                className="
                  font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]
                "
              >
                Save
              </button>

              <button
                onClick={() => {
                  setNewUsername(user.username);
                  setEditing(false);
                }}
                className="
                  font-bold
                  px-2 py-1
                  bg-[#c8a389]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]
                "
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="ml-2"><strong>Email:</strong> {user.email}</p>

        <h2 className="font-bold justify-self-center">Stats</h2>
        <ul className="ml-2">
          <li><span className="font-bold">Versus - P1 Wins:</span> {stats.p1_wins} <span className="font-bold">P1 Losses:</span> {stats.p1_losses}</li>
          <li><span className="font-bold">Versus - P2 Wins:</span> {stats.p2_wins} <span className="font-bold">P2 Losses:</span> {stats.p2_losses}</li>
          <li><span className="font-bold">Draws:</span> {stats.draws}</li>
          <li><span className="font-bold">Versus Games Played:</span> {stats.versus_games_played}</li>
          <li><span className="font-bold">Arcade Kills:</span> {stats.arcade_kills}</li>
          <li><span className="font-bold">Arcade Victories:</span> {stats.arcade_victories}</li>
          <li><span className="font-bold">Arcade Losses:</span> {stats.arcade_losses}</li>
          <li><span className="font-bold">Arcade Games Played:</span> {stats.arcade_games_played}</li>
          <li><span className="font-bold">Total Games Played:</span> {stats.total_games_played}</li>
        </ul>
        <div className="flex justify-center gap-6 mt-6">
          <button className="
            mt-4 ml-2
            font-bold
            px-3 py-2
            bg-[#c8a389]
            border border-black
            shadow-[2px_2px_0_#000]
            hover:shadow-[1px_1px_0_#000]
            hover:translate-x-[1px] hover:translate-y-[1px]
            active:shadow-none
            active:translate-x-[2px] active:translate-y-[2px]
          " onClick={() => setShowResetConfirm(true)}>
            Reset Stats
          </button>

          {showResetConfirm && (
            <Modal
              title="Reset Stats"
              onClose={() => setShowResetConfirm(false)}
            >
              <p className="mb-3">
                Are you sure you want to reset your stats? This cannot be undone.
              </p>

              <div className="flex gap-2 justify-end">
                <button
                  disabled={loading}
                  className="
                    font-bold
                    px-3 py-1
                    bg-[#c25c5c]
                    text-white
                    border border-black
                    shadow-[2px_2px_0_#000]
                    hover:shadow-[1px_1px_0_#000]
                    hover:translate-x-[1px] hover:translate-y-[1px]
                  "
                  onClick={async () => {
                    const success = await resetStats();
                    if (success) setShowResetConfirm(false);
                  }}
                >
                  Reset
                </button>

                <button
                  className="
                    font-bold
                    px-3 py-1
                    bg-[#e9d196]
                    border border-black
                    shadow-[2px_2px_0_#000]
                    hover:shadow-[1px_1px_0_#000]
                    hover:translate-x-[1px] hover:translate-y-[1px]
                  "
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}

          <button
          className="
            mt-4 ml-2
            font-bold
            px-3 py-2
            bg-[#c25c5c]
            text-white
            border border-black
            shadow-[2px_2px_0_#000]
            hover:shadow-[1px_1px_0_#000]
            hover:translate-x-[1px] hover:translate-y-[1px]
            active:shadow-none
            active:translate-x-[2px] active:translate-y-[2px]
          "
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete Profile
        </button>
        {showDeleteConfirm && (
          <Modal
            title="Delete Profile"
            onClose={() => setShowDeleteConfirm(false)}
          >
            <p className="mb-3 font-bold">
              This will permanently delete your account.
            </p>

            <div className="flex gap-2 justify-end">
              <button
                disabled={loading}
                className="
                  font-bold
                  px-3 py-1
                  bg-[#c25c5c]
                  text-white
                  border border-black
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                "
                onClick={async () => {
                  const success = await deleteAccount();
                  if (success) window.location.href = "/login";
                }}
              >
                Delete
              </button>

              <button
                className="
                  font-bold
                  px-3 py-1
                  bg-[#e9d196]
                  border border-black
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                "
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        </div>
      </div>
    </div>
  );
}
