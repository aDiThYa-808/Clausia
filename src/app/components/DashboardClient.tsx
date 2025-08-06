"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/auth/supabaseClient";
import { User } from "@supabase/supabase-js";
import { LogOut, Plus, Calendar, Tag, CheckCircle, Clock } from "lucide-react";

type Props = {
  user: User | null;
  policies: {
    id: string;
    product_name: string;
    product_type: string;
    last_updated: string;
    status: string;
  }[];
  credits: number | null;
};

export default function DashboardClient({ user, policies, credits }: Props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleNewPolicy = () => {
    router.push("/new");
  };

  const handlePolicyClick = (id: string) => {
    router.push(`/privacypolicy/preview/${id}`);
  };

  dayjs.extend(utc);
  dayjs.extend(relativeTime);

  const getRelativeTime = (dateString: string): string => {
    const date = dayjs.utc(dateString).local(); // Convert from UTC to local time
    const now = dayjs(); // already local

    const diffMinutes = now.diff(date, "minute");

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

    const diffHours = now.diff(date, "hour");
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = now.diff(date, "day");
    if (diffDays < 7) return `${diffDays} days ago`;

    const diffWeeks = now.diff(date, "week");
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

    const diffMonths = now.diff(date, "month");
    return `${diffMonths} months ago`;
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
                style={{ fontFamily: "Chillax" }}
              >
                Clausia
              </h1>
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
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-200"
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
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-purple-200/50 py-1 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-800">
                        {user?.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                      <p className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium mt-1">
                        {credits ?? 0} credits remaining
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Your Policies
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-600 text-lg">
              Manage and track your privacy policies. You have{" "}
              <span
                className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                style={{ fontFamily: "Chillax" }}
              >
                {credits ?? 0} credits
              </span>{" "}
              remaining.
            </p>
            <button
              onClick={handleNewPolicy}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Policy
            </button>
          </div>
        </div>

        {/* Policies Grid */}
        {policies && policies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                onClick={() => handlePolicyClick(policy.id)}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-lg hover:shadow-xl cursor-pointer hover:border-purple-300/50 hover:bg-white/90 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 text-lg leading-tight group-hover:text-purple-700">
                    {policy.product_name}
                  </h3>
                  <div className="flex-shrink-0 ml-2">
                    {policy.status === "completed" ? (
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                      <Tag className="w-3 h-3 text-white" />
                    </div>
                    <span className="capitalize font-medium">
                      {policy.product_type}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <div className="w-5 h-5 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg flex items-center justify-center mr-2">
                      <Calendar className="w-3 h-3 text-white" />
                    </div>
                    <span>Updated {getRelativeTime(policy.last_updated)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${
                      policy.status === "completed"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                        : "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {policy.status === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-200/50 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                No policies yet
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                Create your first privacy policy to get started. Our AI will
                help you generate comprehensive, compliant policies in minutes.
              </p>
              <button
                onClick={handleNewPolicy}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Policy
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
