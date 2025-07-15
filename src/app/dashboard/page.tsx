'use client';

import { useRouter } from 'next/navigation';

const mockPolicies = [
  {
    id: 'abc123',
    name: 'My App',
    type: 'App',
    createdAt: '2025-07-13',
    status: 'draft',
  },
  {
    id: 'def456',
    name: 'FunGameX',
    type: 'Game',
    createdAt: '2025-07-12',
    status: 'generated',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-indigo-600">LegalZap</h1>
        <div className="flex items-center gap-4">
          <span className="bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">
            Credits: 10
          </span>
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm text-slate-500">
            A
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Policies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div
            onClick={() => router.push('/new')}
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
              <div className="text-lg font-semibold truncate">{policy.name}</div>
              <div className="text-sm text-slate-500 capitalize">Type: {policy.type}</div>
              <div className="text-xs text-slate-400 mt-1">Created: {policy.createdAt}</div>
              <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded-full font-medium ${
                  policy.status === 'generated'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
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
            <p className="text-sm mt-2">Click below to create your first one.</p>
            <button
              onClick={() => router.push('/new')}
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
