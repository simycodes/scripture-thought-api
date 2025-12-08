import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getCurrentUser, logout } from "./index";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./DashboardLayout.css";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await getCurrentUser();
    return data;
  } catch (err) {
    return redirect("/");
  }
};

export const useDashboard = () => useContext(DashboardContext);

export default function DashboardLayout() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);

  // logout helper
  const logoutUser = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      toast.success("Logged out");
      navigate("/");
    }
  };

  // set axios interceptor only once - eject on unmount
  useEffect(() => {
    const interceptor = (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        setAuthError(true);
      }
      return Promise.reject(error);
    };
    const id = (globalThis.customInterceptorId = customFetch.interceptors.response.use((r) => r, interceptor));
    return () => {
      try {
        customFetch.interceptors.response.eject(id);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    if (authError) logoutUser();
  }, [authError]);

  return (
    <DashboardContext.Provider value={{ user, logoutUser }}>
      <main className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <Navbar />
          <motion.section
            className="p-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Outlet context={{ user }} />
          </motion.section>
        </div>
      </main>
    </DashboardContext.Provider>
  );
}