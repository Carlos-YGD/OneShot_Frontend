import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, login, register, logout, loading, error } = useAuthStore();

  return {
    user,
    login,
    register,
    logout,
    loading,
    error,
  };
};
