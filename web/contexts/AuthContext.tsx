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
  needsPassword: boolean;
  onPasswordSet: () => void;
  logout: () => void;
  enrolledCourseIds: Set<string>;
  enrolledPlanKeys: Set<string>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [enrolledPlanKeys, setEnrolledPlanKeys] = useState<Set<string>>(new Set());

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


        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.user_metadata?.username || session.user.email?.split("@")[0] || "",
        });
        localStorage.setItem("automate-current-user-id", session.user.id);
        window.dispatchEvent(new Event("cart-updated"));
        
        const hasEmailProvider = session.user.app_metadata?.providers?.includes('email');
        const hasSetPassword = session.user.user_metadata?.has_set_password === true;
        
        // If they created their account within the last 15 seconds, it's a sign up.
        const createdAt = new Date(session.user.created_at).getTime();
        const isFirstLogin = Math.abs(lastSignInAt - createdAt) < 15000;
        
        if (!hasEmailProvider && !hasSetPassword && isFirstLogin) {
          setNeedsPassword(true);
          setIsLoggedIn(false);
          setIsOpen(true);
        } else {
          setIsLoggedIn(true);
          setNeedsPassword(false);
          
          // Fetch user enrollments to update UI buttons
          const fetchEnrollments = async (userId: string) => {
            const { data } = await supabaseBrowser
              .schema("phase2")
              .from("enrollments")
              .select("course_id, product_id, bundle_id, users!inner(auth_user_id)")
              .eq("users.auth_user_id", userId)
              .eq("status", "active");

            if (data) {
              const courseIds = new Set<string>();
              const planKeys = new Set<string>();
              
              const missingProductCourseIds = data.filter((e: any) => e.course_id && !e.product_id).map((e: any) => e.course_id);
              let resolvedProducts: Record<string, string> = {};
              
              if (missingProductCourseIds.length > 0) {
                const { data: mcData } = await supabaseBrowser
                  .from("maincourses")
                  .select("id, product_id")
                  .in("id", missingProductCourseIds);
                  
                if (mcData) {
                  mcData.forEach((mc: any) => {
                    if (mc.product_id) {
                      resolvedProducts[mc.id] = mc.product_id;
                    }
                  });
                }
              }

              data.forEach((e: any) => {
                if (e.course_id) courseIds.add(String(e.course_id));
                
                const finalProductId = e.product_id || (e.course_id ? resolvedProducts[e.course_id] : null);
                if (finalProductId) {
                  courseIds.add(String(finalProductId));
                }
                
                if (e.bundle_id) {
                  if (e.course_id) planKeys.add(`${e.course_id}::${e.bundle_id}`);
                  if (finalProductId) planKeys.add(`${finalProductId}::${e.bundle_id}`);
                }
              });

              setEnrolledCourseIds(courseIds);
              setEnrolledPlanKeys(planKeys);
            }
          };
          fetchEnrollments(session.user.id);

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


        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.user_metadata?.username || session.user.email?.split("@")[0] || "",
        });
        localStorage.setItem("automate-current-user-id", session.user.id);
        window.dispatchEvent(new Event("cart-updated"));
        
        const hasEmailProvider = session.user.app_metadata?.providers?.includes('email');
        const hasSetPassword = session.user.user_metadata?.has_set_password === true;
        
        // If they created their account within the last 15 seconds, it's a sign up.
        const createdAt = new Date(session.user.created_at).getTime();
        const isFirstLogin = Math.abs(lastSignInAt - createdAt) < 15000;
        
        if (!hasEmailProvider && !hasSetPassword && isFirstLogin) {
          setNeedsPassword(true);
          setIsLoggedIn(false);
          setIsOpen(true);
        } else {
          setIsLoggedIn(true);
          setNeedsPassword(false);

          // Fetch user enrollments to update UI buttons
          const fetchEnrollments = async (userId: string) => {
            const { data } = await supabaseBrowser
              .schema("phase2")
              .from("enrollments")
              .select("course_id, product_id, bundle_id, users!inner(auth_user_id)")
              .eq("users.auth_user_id", userId)
              .eq("status", "active");

            if (data) {
              const courseIds = new Set<string>();
              const planKeys = new Set<string>();
              
              const missingProductCourseIds = data.filter((e: any) => e.course_id && !e.product_id).map((e: any) => e.course_id);
              let resolvedProducts: Record<string, string> = {};
              
              if (missingProductCourseIds.length > 0) {
                const { data: mcData } = await supabaseBrowser
                  .from("maincourses")
                  .select("id, product_id")
                  .in("id", missingProductCourseIds);
                  
                if (mcData) {
                  mcData.forEach((mc: any) => {
                    if (mc.product_id) {
                      resolvedProducts[mc.id] = mc.product_id;
                    }
                  });
                }
              }

              data.forEach((e: any) => {
                if (e.course_id) courseIds.add(String(e.course_id));
                
                const finalProductId = e.product_id || (e.course_id ? resolvedProducts[e.course_id] : null);
                if (finalProductId) {
                  courseIds.add(String(finalProductId));
                }
                
                if (e.bundle_id) {
                  if (e.course_id) planKeys.add(`${e.course_id}::${e.bundle_id}`);
                  if (finalProductId) planKeys.add(`${finalProductId}::${e.bundle_id}`);
                }
              });

              setEnrolledCourseIds(courseIds);
              setEnrolledPlanKeys(planKeys);
            }
          };
          fetchEnrollments(session.user.id);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setEnrolledCourseIds(new Set());
        setEnrolledPlanKeys(new Set());
        setNeedsPassword(false);
        localStorage.removeItem("automate-current-user-id");
        window.dispatchEvent(new Event("cart-updated"));
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
    if (needsPassword) {
      supabaseBrowser.auth.signOut();
      setNeedsPassword(false);
      setUser(null);
    }
  }, [needsPassword]);

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

  const onPasswordSet = useCallback(() => {
    setNeedsPassword(false);
    setIsLoggedIn(true);
    const savedActionStr = sessionStorage.getItem("pendingAuthAction");
    if (savedActionStr || pendingAction) {
      if (!pendingAction && savedActionStr) {
        try {
          const action = JSON.parse(savedActionStr) as PendingAction;
          setPendingAction(action);
          setTimeout(() => {
            setIsOpen(false);
            sessionStorage.removeItem("pendingAuthAction");
            if (action?.type === "addToCart" && typeof action.payload === "object") {
              addToCart(action.payload);
            } else if (action?.type === "buyNow" && typeof action.payload === "string") {
              window.location.href = action.payload;
            }
            setPendingAction(null);
          }, 0);
          return;
        } catch (e) {
          console.error(e);
        }
      }
      executePendingAction();
    } else {
      setIsOpen(false);
    }
  }, [pendingAction, executePendingAction]);

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
        needsPassword,
        onPasswordSet,
        logout,
        enrolledCourseIds,
        enrolledPlanKeys,
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
