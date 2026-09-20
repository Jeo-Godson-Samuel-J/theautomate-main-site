"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase.browser";

import { CartItem, addToCart } from "@/lib/services/cart";

type PendingAction =
  | { type: "addToCart"; payload: CartItem }
  | { type: "buyNow"; payload: string } // href
  | null;

interface AuthContextValue {
  isOpen: boolean;
  openAuth: (pendingAction?: PendingAction) => void;
  closeAuth: () => void;
  pendingAction: PendingAction;
  isLoggedIn: boolean;
  user: { name: string; email: string; id: string } | null;
  executePendingAction: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);

  useEffect(() => {
    // Check active session on mount
    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const lastSignInAt = new Date(session.user.last_sign_in_at || session.user.created_at).getTime();
        const daysSinceSignIn = (Date.now() - lastSignInAt) / (1000 * 60 * 60 * 24);

        if (daysSinceSignIn > 14) {
          supabaseBrowser.auth.signOut();
          return;
        }

        setIsLoggedIn(true);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "",
        });
        
        // If we have a pending action in sessionStorage from an OAuth redirect, execute it!
        const savedAction = sessionStorage.getItem("pendingAuthAction");
        if (savedAction) {
          try {
            const action = JSON.parse(savedAction) as PendingAction;
            if (action) {
              sessionStorage.removeItem("pendingAuthAction");
              // Execute it
              setTimeout(() => {
                if (action.type === "addToCart" && typeof action.payload === "object") {
                  addToCart(action.payload as CartItem);
                } else if (action.type === "buyNow" && typeof action.payload === "string") {
                  window.location.href = action.payload;
                }
              }, 500);
            }
          } catch (e) {
            console.error("Failed to parse pendingAuthAction", e);
          }
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const lastSignInAt = new Date(session.user.last_sign_in_at || session.user.created_at).getTime();
        const daysSinceSignIn = (Date.now() - lastSignInAt) / (1000 * 60 * 60 * 24);

        if (daysSinceSignIn > 14) {
          supabaseBrowser.auth.signOut();
          return;
        }

        setIsLoggedIn(true);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "",
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = useCallback((action?: PendingAction) => {
    setPendingAction(action ?? null);
    if (action) {
      sessionStorage.setItem("pendingAuthAction", JSON.stringify(action));
    } else {
      sessionStorage.removeItem("pendingAuthAction");
    }
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
    sessionStorage.removeItem("pendingAuthAction");
  }, []);

  const executePendingAction = useCallback(() => {
    setIsOpen(false);
    sessionStorage.removeItem("pendingAuthAction");
    if (pendingAction?.type === "addToCart" && typeof pendingAction.payload === "object") {
      addToCart(pendingAction.payload);
    } else if (pendingAction?.type === "buyNow" && typeof pendingAction.payload === "string") {
      window.location.href = pendingAction.payload;
    }
    setPendingAction(null);
  }, [pendingAction]);

  const logout = useCallback(async () => {
    await supabaseBrowser.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        openAuth,
        closeAuth,
        pendingAction,
        isLoggedIn,
        user,
        executePendingAction,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
