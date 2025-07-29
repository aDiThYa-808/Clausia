"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/auth/supabaseClient";
import { syncProfile } from "@/lib/supabase/auth/syncUserProfile";

type Props = {
  user: any;
  policies: {
    id: string;
    product_name: string;
    product_type: string;
    last_updated: string;
    status: string;
  }[];
};

export default function DashboardClient({ user, policies }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (user) {
      void syncProfile(user);
    }
  }, []);

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
    user?.user_metadata?.picture ||
    "/default-avatar.png";

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/20 z-40"
            onClick={() => setSidebarOpen(false)}
          />
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
                <h2 className="text-2xl font-bold text-[#BC3FDE]">Clausia</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate-500 hover:text-slate-700 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
    
            {/* Sidebar Content */}
            <div className="flex-1 p-6">
              {/* Add nav links here later */}
            </div>
    
            {/* Profile Section */}
            <div className="p-6 border-t border-slate-200">
              <div className="flex items-center space-x-3">
                {user?.user_metadata?.avatar_url ? (
                  <img src={avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg text-slate-500">
                    ?
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{user?.user_metadata?.full_name || "User"}</p>
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
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-[#BC3FDE]">Dashboard</h1>
          </div>
        </header>
    
        {/* Main Content */}
        <main className="px-6 py-10 max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Your Policies</h2>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Create New Card */}
            <div
              onClick={() => router.push("/new")}
              className="border-2 border-dashed border-slate-300 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#BC3FDE] hover:text-[#BC3FDE] transition hover:scale-[1.02]"
            >
              <div className="text-4xl">＋</div>
              <p className="mt-2 text-sm font-medium">Create New Policy</p>
            </div>
    
            {/* Existing Policies */}
            {policies?.map((data) => (
              <div
                key={data.id}
                onClick={() => router.push(`/privacypolicy/preview/${data.id}`)}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition hover:scale-[1.01]"
              >
                <div className="text-md font-semibold text-slate-800 truncate">{data.product_name}</div>
                <div className="text-sm text-slate-500 capitalize">Type: {data.product_type}</div>
                <div className="text-xs text-slate-400 mt-1">Created: {data.last_updated}</div>
                <span
                  className={`inline-block mt-3 px-2 py-1 text-xs rounded-full font-medium ${
                    data.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {data.status}
                </span>
              </div>
            ))}
          </div>
    
          {/* Empty State */}
          {policies?.length === 0 && (
            <div className="text-center text-slate-500 mt-20">
              <p className="text-xl text-slate-800 font-medium">No policies yet</p>
              <p className="text-sm mt-2">Click below to create your first one.</p>
              <button
                onClick={() => router.push("/new")}
                className="mt-4 px-4 py-2 bg-[#BC3FDE] hover:bg-[#a333c5] text-white rounded-xl shadow-sm transition"
              >
                Create New Policy
              </button>
            </div>
          )}
        </main>
      </div>
    );
    
}
