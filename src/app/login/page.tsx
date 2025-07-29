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
      router.push("/dashboard");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (user) return null;

  const signInWithGoogle = async () => {
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:`${origin}/auth/callback`,
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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm px-6 py-10 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome to Clausia
          </h1>
          <p className="text-sm text-slate-500">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <button
            onClick={signInWithGitHub}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>

        <p className="text-xs text-center text-slate-400">
          By signing in, you agree to our privacy policy.
        </p>
      </div>
    </main>
  );
}
