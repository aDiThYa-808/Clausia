"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/auth/supabaseClient";
import { useUser } from "@/lib/supabase/auth/useUser";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (user) return null;

  const signInWithGoogle = async () => {
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) console.error("Google login error:", error);
  };

  const signInWithGitHub = async () => {
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) console.error("GitHub login error:", error);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F8F5FC] to-[#f1e9fb] px-4">
      {/* Subtle background shape */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50px] left-[-100px] w-[300px] h-[300px] bg-[#BC3FDE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-[#BC3FDE]/20 rounded-full blur-2xl"></div>
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl px-8 py-12 space-y-10 border border-slate-100">
        {/* Logo / Brand Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-[#BC3FDE]/10 flex items-center justify-center">
            <img src="/icons/shield.svg" alt="Clausia" className="w-6 h-6" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome to Clausia
          </h1>
          <p className="text-sm text-slate-500">Your AI legal assistant</p>
        </div>

        {/* Auth buttons */}
        <div className="space-y-4">
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 transition shadow-sm hover:shadow-md"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              or
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={signInWithGitHub}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm hover:shadow-md"
          >
            <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>

        {/* Tagline */}
        <p className="text-xs text-center text-slate-400">
          By signing in, you agree to our{" "}
          <span className="underline underline-offset-2 decoration-[#BC3FDE] hover:text-[#BC3FDE] transition cursor-pointer">
            privacy policy
          </span>
          .
        </p>
      </div>
    </main>
  );
}
