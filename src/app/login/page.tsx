"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseBrowserClient";
import { useUser } from "@/lib/supabase/useUser";
import Image from "next/image";

export default function LoginPage() {
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
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-12 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/10 rounded-full blur-2xl"></div>
      </div>
  
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative max-w-lg w-full">
            <Image
              src="illustrations/hero-image.svg"
              alt="Clausia Illustration"
              height={500}
              width = {500}
              className="w-full h-auto"
            />
          </div>
        </div>
  
        {/* Right Side - Auth Card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-8 space-y-6 border border-blue-200/30">
            {/* Wordmark Logo */}
            <div className="text-center">
              <h1
                className="text-3xl font-bold text-blue-600"
                style={{ fontFamily: "chillax" }}
              >
                Clausia
              </h1>
            </div>
  
            {/* Heading */}
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Welcome back
              </h2>
              <p className="text-sm text-slate-600">
                Sign in to continue creating policies
              </p>
            </div>
  
            {/* Auth buttons */}
            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <Image src="/icons/google.svg" alt="Google" height={48} width={48} className="w-5 h-5" />
                Continue with Google
              </button>
  
              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-300" />
                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-300" />
              </div>
  
              <button
                onClick={signInWithGitHub}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 hover:shadow-md transition-all duration-200"
              >
                <Image src="/icons/github.svg" alt="GitHub" height={96} width={98} className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>
  
            {/* Benefits */}
            <div className="pt-2">
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                  Generate policies in minutes
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                  100% compliant with Indian regulations
                </div>
              </div>
            </div>
  
            {/* Footer */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-center text-slate-500 leading-relaxed">
                By signing in, you agree to our{" "}
                <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer underline underline-offset-2">
                  <a href="/legal/termsofservice">
                  Terms
                  </a>
                </span>{" "}
                and{" "}
                <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer underline underline-offset-2">
                  <a href="/legal/privacypolicy">
                  Privacy Policy
                  </a>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
