"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabaseBrowser } from "@/lib/supabase.browser";

/* ─── Google SVG logo ──────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path
        d="M47.532 24.552c0-1.636-.132-3.208-.384-4.713H24.48v9.116h12.986c-.57 2.964-2.24 5.474-4.77 7.156v5.896h7.718c4.516-4.16 7.118-10.29 7.118-17.455z"
        fill="#4285F4"
      />
      <path
        d="M24.48 48c6.516 0 11.984-2.16 15.978-5.852l-7.718-5.896c-2.16 1.448-4.916 2.304-8.26 2.304-6.352 0-11.728-4.288-13.652-10.054H3.024v6.09C6.996 42.78 15.18 48 24.48 48z"
        fill="#34A853"
      />
      <path
        d="M10.828 28.502A14.48 14.48 0 0 1 9.72 24c0-1.564.272-3.086.746-4.502V13.41H3.024A23.964 23.964 0 0 0 .48 24c0 3.87.928 7.528 2.544 10.59l7.804-6.088z"
        fill="#FBBC05"
      />
      <path
        d="M24.48 9.498c3.576 0 6.784 1.228 9.312 3.642l6.978-6.978C36.456 2.376 30.99 0 24.48 0 15.18 0 6.996 5.22 3.024 13.41l7.804 6.09C12.752 13.786 18.128 9.498 24.48 9.498z"
        fill="#EA4335"
      />
    </svg>
  );
}

type AuthStep = "email" | "login" | "signup";

export default function AuthModal() {
  const { isOpen, closeAuth, executePendingAction } = useAuth();
  
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);

  /* Reset state and focus input when modal opens/closes */
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(null);
      setTimeout(() => emailInputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  /* Focus password input when step changes */
  useEffect(() => {
    if (step === "login" || step === "signup") {
      setTimeout(() => passInputRef.current?.focus(), 50);
    }
  }, [step]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeAuth]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) closeAuth();
  };

  const loginWithGoogle = async () => {
    setError(null);
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (error) setError(error.message);
  };

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to check email");

      if (data.exists) {
        setStep("login");
      } else {
        setStep("signup");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseBrowser.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      
      executePendingAction();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabaseBrowser.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      
      // Sync landing user if signup successful
      if (data.user) {
        await fetch("/api/auth/sync-landing-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.user.email, authUserId: data.user.id }),
        });
      }

      executePendingAction();
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          className="relative w-full max-w-[420px] rounded-[28px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden"
          style={{
            animation: "authModalIn 0.25s cubic-bezier(0.34,1.46,0.64,1) both",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#0166A7] via-[#0284c7] to-[#0166A7]" />

          {/* Close button */}
          <button
            onClick={closeAuth}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
          >
            <X size={17} />
          </button>

          {/* Back button if not on email step */}
          {step !== "email" && (
            <button
              onClick={() => {
                setStep("email");
                setError(null);
                setPassword("");
                setConfirmPassword("");
              }}
              className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
            >
              <ArrowLeft size={17} />
            </button>
          )}

          <div className="px-8 py-8">
            {/* Header */}
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex justify-center">
                <Image
                  src="/logo.svg"
                  alt="Auto-Mate"
                  width={140}
                  height={46}
                  className="h-10 w-auto"
                />
              </div>
              <h2 className="text-[22px] font-bold text-slate-900 leading-tight">
                {step === "email" ? "Sign in to Auto-Mate" : step === "login" ? "Welcome back" : "Create an account"}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                {step === "email" 
                  ? "Create an account or sign in to continue"
                  : email}
              </p>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {step === "email" && (
              <>
                <button
                  onClick={loginWithGoogle}
                  className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-slate-200 bg-white px-5 py-3.5 text-[14px] font-semibold text-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.98]"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    or
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <form onSubmit={handleCheckEmail} className="flex flex-col gap-3">
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-[#0166A7] focus:bg-white focus:shadow-[0_0_0_3px_rgba(1,102,167,0.12)]"
                  />
                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full rounded-[14px] bg-[#0166A7] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(1,102,167,0.3)] transition-all duration-150 hover:bg-[#014f82] hover:shadow-[0_6px_20px_rgba(1,102,167,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {loading ? "Checking..." : "Continue with email"}
                  </button>
                </form>
              </>
            )}

            {step === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  ref={passInputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-[#0166A7] focus:bg-white focus:shadow-[0_0_0_3px_rgba(1,102,167,0.12)]"
                />
                <button
                  type="submit"
                  disabled={loading || !password}
                  className="w-full rounded-[14px] bg-[#0166A7] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(1,102,167,0.3)] transition-all duration-150 hover:bg-[#014f82] hover:shadow-[0_6px_20px_rgba(1,102,167,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            )}

            {step === "signup" && (
              <form onSubmit={handleSignup} className="flex flex-col gap-3">
                <input
                  ref={passInputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-[#0166A7] focus:bg-white focus:shadow-[0_0_0_3px_rgba(1,102,167,0.12)]"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:border-[#0166A7] focus:bg-white focus:shadow-[0_0_0_3px_rgba(1,102,167,0.12)]"
                />
                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword}
                  className="w-full rounded-[14px] bg-[#0166A7] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(1,102,167,0.3)] transition-all duration-150 hover:bg-[#014f82] hover:shadow-[0_6px_20px_rgba(1,102,167,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>
            )}

            {step === "email" && (
              <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">
                By continuing, you agree to Auto-Mate&apos;s{" "}
                <a href="/terms" className="text-slate-500 underline hover:text-[#0166A7] transition-colors">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-slate-500 underline hover:text-[#0166A7] transition-colors">
                  Privacy Policy
                </a>.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes authModalIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  );
}
