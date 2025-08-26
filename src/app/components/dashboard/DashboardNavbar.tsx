"use client";
import { supabase } from "@/lib/supabase/supabaseBrowserClient";
import { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  user: User | null;
  credits: number | null;
};

export default function DashboardNavbar({ user, credits }: Props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCreditsPurchase = async () => {
    router.push("/credits");
  };

  const handleBillingHistory = async () =>{
    router.push("/billing")
  }

  const handleLogout = async () => {
    if (!user) return;

    console.log("Logging out...");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard">
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
                style={{ fontFamily: "Chillax" }}
              >
                Clausia
              </h1>
            </Link>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-slate-700">
                {credits ?? 0} credits
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
              >
                {user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    height={96}
                    width={96}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-200"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = "/icons/default-avatar.svg"; // fallback image
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm">
                    {user?.user_metadata?.full_name
                      ? getUserInitials(user.user_metadata.full_name)
                      : "?"}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium">
                  {user?.user_metadata?.full_name || "User"}
                </span>
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-purple-200/50 py-1 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">
                      {user?.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleCreditsPurchase();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 rounded-lg mx-1"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                      Purchase Credits
                    </button>

                    <button
                      onClick={() => {
                        handleBillingHistory()
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 rounded-lg mx-1"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Billing History
                    </button>
                  </div>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
