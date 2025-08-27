"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import {
  Plus,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Zap,
} from "lucide-react";

type Props = {
  policies: {
    id: string;
    product_name: string;
    product_type: string;
    last_updated: string;
    status: string;
  }[];
  credits: number | null;
};

export default function DashboardPolicyList({ policies, credits }: Props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNewPolicy = () => {
    router.push("/new");
  };

  const handlePolicyClick = (id: string) => {
    router.push(`/privacypolicy/preview/${id}`);
  };

  const handleCreditsPurchase = async () => {
    router.push("/credits");
  };

  dayjs.extend(utc);
  dayjs.extend(relativeTime);

  const getRelativeTime = (dateString: string): string => {
    const date = dayjs.utc(dateString).local();
    const now = dayjs();

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

  const completedPolicies =
    policies?.filter((p) => p.status === "completed").length || 0;
  const totalPolicies = policies?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 blur-3xl"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-8">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-slate-700 leading-tight">
                Dashboard
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-md">
                Manage and monitor your privacy policies with ease
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
              <div className="relative flex items-center">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-600">
                    Total Policies
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {totalPolicies}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
              <div className="relative flex items-center">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-600">
                    Published
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {completedPolicies}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5"></div>

              
              <div className="relative flex items-center justify-between">
                {/* Left: Icon + Credits */}
                <div className="flex items-center">
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-600">
                      Credits Remaining
                    </p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {credits ?? 0}
                    </p>
                  </div>
                </div>

                {/* Right: Button */}
                <button
                  onClick={handleCreditsPurchase}
                  className="px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 text-sm font-medium rounded-lg border border-purple-200/50 hover:border-purple-300/50 transition-all duration-200 flex-shrink-0"
                >
                  Purchase More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Policies Grid */}
        {policies && policies.length > 0 ? (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Your Policies
                </h2>
                <div className="text-sm text-slate-500">
                  {totalPolicies} {totalPolicies === 1 ? "policy" : "policies"}{" "}
                  total
                </div>
              </div>
              <button
                onClick={handleNewPolicy}
                className="relative group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                <Plus className="relative w-5 h-5 mr-2" />
                <span className="relative">Create Policy</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  onClick={() => handlePolicyClick(policy.id)}
                  className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                    {policy.status === "completed" ? (
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg shadow-green-500/25"></div>
                    ) : (
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-500/25 animate-pulse"></div>
                    )}
                  </div>

                  <div className="relative space-y-3.5 sm:space-y-4">
                    {/* Header */}
                    <div className="space-y-2 sm:space-y-2.5 pr-6 sm:pr-8">
                      <h3 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200 leading-tight line-clamp-2">
                        {policy.product_name}
                      </h3>
                      <div className="flex items-center text-sm">
                        <div className="flex items-center text-slate-600">
                          <div className="p-1.5 bg-slate-100 rounded-lg mr-2 flex-shrink-0">
                            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                          <span className="capitalize font-medium truncate">
                            {policy.product_type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        Updated {getRelativeTime(policy.last_updated)}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 pt-1 sm:pt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-full self-start ${
                          policy.status === "completed"
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200/50"
                            : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200/50"
                        }`}
                      >
                        {policy.status === "completed" ? (
                          <>
                            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" />
                            In Progress
                          </>
                        )}
                      </span>

                      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="text-xs text-slate-400 bg-slate-100/50 px-2 py-1 rounded-md whitespace-nowrap">
                          Click to view →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="relative text-center py-12 sm:py-16 lg:py-20 px-4">
            <div className="relative z-10 max-w-lg mx-auto">
              {/* Icon */}
              <div className="mb-6 sm:mb-8">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 rounded-full"></div>
                  <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-white to-purple-50/50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-400"
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
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Ready to get started?
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed px-4">
                  Create your first privacy policy with our AI-powered
                  generator. Professional, compliant policies in minutes.
                </p>
              </div>

              <button
                onClick={handleNewPolicy}
                className="relative group inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                <Plus className="relative w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                <span className="relative">Create Your First Policy</span>
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
