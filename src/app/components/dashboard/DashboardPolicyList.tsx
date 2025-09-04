"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Plus,
  Calendar,
  Tag,
  CheckCircle,
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

  const completedPolicies = policies?.filter((p) => p.status === "completed").length || 0;
  const totalPolicies = policies?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total Policies */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Policies</p>
                  <p className="text-2xl font-semibold text-gray-900">{totalPolicies}</p>
                </div>
              </div>
            </div>

            {/* Published */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-semibold text-gray-900">{completedPolicies}</p>
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sm:col-span-2 lg:col-span-1 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Credits</p>
                    <p className="text-2xl font-semibold text-gray-900">{credits ?? 0}</p>
                  </div>
                </div>
                <button
                  onClick={handleCreditsPurchase}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  Buy More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Privacy Policies</h2>
              </div>
              <button
                onClick={handleNewPolicy}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-md transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Policy
              </button>
            </div>
          </div>

          {policies && policies.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  onClick={() => handlePolicyClick(policy.id)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-medium text-gray-900 truncate pr-4">
                          {policy.product_name}
                        </h3>
                        <div className="flex-shrink-0">
                          {policy.status === "completed" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-1.5"></div>
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          <span className="capitalize">{policy.product_type}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Updated {getRelativeTime(policy.last_updated)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No policies yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Get started by creating your first privacy policy. It only takes a few minutes.
              </p>
              <button
                onClick={handleNewPolicy}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Policy
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}