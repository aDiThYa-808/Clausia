"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/lib/supabase/useUser";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { syncProfile } from "@/lib/supabase/syncUserProfile";

const mockPolicies = [
  {
    id: "abc123",
    name: "My App",
    type: "App",
    createdAt: "2025-07-13",
    status: "draft",
  },
  {
    id: "def456",
    name: "FunGameX",
    type: "Game",
    createdAt: "2025-07-12",
    status: "generated",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && user) {
      void syncProfile(user);
    }
    // Only run once after login
  }, [loading]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setOpen(false);
      }

      if (
        sidebarRef.current &&
        !(sidebarRef.current as any).contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture || // Some providers like Google use `picture`
    "/default-avatar.png";

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20  z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-indigo-600">Clausia</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-500 hover:text-slate-700 p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 p-6">
            {/* You can add navigation items here */}
          </div>

          {/* Profile Section */}
          <div className="p-6 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              {user?.user_metadata?.avatar_url ? (
                <img
                  key={user?.id}
                  src={avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg text-slate-500">
                  ?
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-sm text-slate-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm relative">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900 p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
        </div>

      </header>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Policies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div
            onClick={() => router.push("/new")}
            className="border-2 border-dashed border-slate-300 p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 hover:text-indigo-600 transition"
          >
            <div className="text-4xl">＋</div>
            <p className="mt-2 text-sm font-medium">Create New Policy</p>
          </div>

          {/* Existing Policies */}
          {mockPolicies.map((policy) => (
            <div
              key={policy.id}
              onClick={() => router.push(`/preview/${policy.id}`)}
              className="bg-white shadow-sm rounded-xl p-4 hover:shadow-md cursor-pointer transition"
            >
              <div className="text-lg font-semibold truncate">
                {policy.name}
              </div>
              <div className="text-sm text-slate-500 capitalize">
                Type: {policy.type}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Created: {policy.createdAt}
              </div>
              <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded-full font-medium ${
                  policy.status === "generated"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {policy.status}
              </span>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockPolicies.length === 0 && (
          <div className="text-center text-slate-500 mt-10">
            <p className="text-lg">No policies yet.</p>
            <p className="text-sm mt-2">
              Click below to create your first one.
            </p>
            <button
              onClick={() => router.push("/new")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Create New Policy
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
