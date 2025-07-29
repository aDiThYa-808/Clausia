'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditorDashboardLayout({
  productName,
  policyId,
  children,
}: {
  productName: string;
  policyId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    const res = await fetch("/api/publish-policy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ policyId }),
    });

    if (res.ok) {
      const result = await res.json();
      router.push(`/privacypolicy/${result.id}`);
    } else {
      alert("Failed to publish policy");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900 font-inter">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-slate-50 border-r border-slate-200 p-4 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:flex-shrink-0 md:flex-col
        `}
      >
        <h2 className="text-lg font-semibold mb-6">Clausia — Editor</h2>
        <ul className="space-y-4 text-sm text-slate-700">
          <li className="text-slate-500 italic">tools coming soon...</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="w-full px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-1.5 -ml-1 rounded hover:bg-slate-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              <svg
                className="h-6 w-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-base font-semibold">
              {productName}
            </div>
          </div>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-[#BC3FDE] text-white font-medium hover:bg-[#a932c6] disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </header>

        <main className="overflow-y-auto px-8 py-10">{children}</main>
      </div>
    </div>
  );
  
}
