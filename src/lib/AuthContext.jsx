import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  const applySession = (session) => {
    const nextUser = session?.user ?? null;
    setUser(nextUser);
    setIsAuthenticated(Boolean(nextUser));
    setAuthError(null);
    setAuthChecked(true);
    setIsLoadingAuth(false);
  };

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("User auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      setAuthError({ type: "unknown", message: error.message });
      setAuthChecked(true);
      setIsLoadingAuth(false);
      return null;
    }

    applySession(data.session);
    return data.session?.user ?? null;
  };

  const checkAppState = async () => {
    setIsLoadingPublicSettings(true);
    setAuthError(null);
    await checkUserAuth();
    setIsLoadingPublicSettings(false);
  };

  useEffect(() => {
    let mounted = true;

    checkAppState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      applySession(session);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error);
      setAuthError({ type: "unknown", message: error.message });
      return;
    }

    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
