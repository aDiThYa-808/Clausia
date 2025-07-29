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
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-semibold mb-6">Clausia - Editor</h2>
        <ul className="space-y-4 text-sm text-slate-700">
          <li className="text-slate-500 italic">tools coming soon...</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="w-full px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="text-base font-semibold">
            {productName} — Privacy Policy
          </div>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </header>

        <main className="overflow-y-auto px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
