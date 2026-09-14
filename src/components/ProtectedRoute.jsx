import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#0b1020]">
    <div className="w-8 h-8 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin" />
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) return fallback;
  if (authError || !isAuthenticated) return unauthenticatedElement || null;
  return <Outlet />;
}
