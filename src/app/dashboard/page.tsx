"use client";

import { useRouter } from "next/navigation";

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

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-white shadow-sm">
        <h1 className="text-xl font-bold text-brand">LegalZap</h1>
        <div className="flex items-center gap-4">
          <span className="bg-brand-light text-brand text-sm px-3 py-1 rounded-full">
            Credits: 10
          </span>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm text-text-secondary">
            A
          </div>
        </div>
      </header>



      {/* Main content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-text-primary">
          Your Policies
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div
            onClick={() => router.push("/new")}
            className="border-2 border-dashed border-gray-300 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand hover:text-brand transition"
          >
            <div className="text-4xl">＋</div>
            <p className="mt-2 text-sm font-medium">Create New Policy</p>
          </div>

          {/* Existing Policy Cards */}
          {mockPolicies.map((policy) => (
            <div
              key={policy.id}
              onClick={() => router.push(`/preview/${policy.id}`)}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg cursor-pointer transition"
            >
              <div className="text-lg font-semibold truncate">
                {policy.name}
              </div>
              <div className="text-sm text-gray-500 capitalize">
                Type: {policy.type}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Created: {policy.createdAt}
              </div>
              <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded-full font-medium ${
                  policy.status === "generated"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {policy.status}
              </span>
            </div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {mockPolicies.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No policies yet.</p>
            <p className="text-sm mt-2">
              Click below to create your first one.
            </p>
            <button
              onClick={() => router.push("/new")}
              className="mt-4 px-4 py-2 bg-brand text-white rounded-md"
            >
              Create New Policy
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
