import { use, useContext } from "react";
import { AuthContext } from "./auth.context.jsx";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "./auth.api.js";
import toast from "react-hot-toast";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await registerUser({ username, email, password });
      setUser(data.user);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
      
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const data = await logoutUser();
    setUser(null);
    setLoading(false);
    toast.success(data.message)
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
