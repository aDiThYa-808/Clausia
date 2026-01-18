"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { ArrowLeft, FileText, Coins, CheckCircle, Eye } from "lucide-react";
import dayjs from "dayjs";
import DashboardFooter from "../dashboard/DashboardFooter";

export default function EditorDashboardLayout({
  productName,
  policyId,
  tokensUsed,
  credits,
  date,
  children,
}: {
  productName: string;
  policyId: string;
  tokensUsed: number;
  credits: number;
  date: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/publish-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyId }),
      });

      if (res.ok) {
        const result = await res.json();
        router.push(`/privacypolicy/${result.id}`);
      } else {
        const errorData = await res.json();
        toast.error("Failed to publish policy", {
          description: errorData?.error,
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish policy", {
        description: "Network/Server error",
      });
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

return (
    <div className="min-h-screen bg-slate-50">
      <Toaster richColors />
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center text-slate-600 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200/50 hover:shadow-sm flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm font-medium hidden xs:block">
                  Back
                </span>
                <span className="text-xs sm:text-sm font-medium xs:hidden">
                  Dashboard
                </span>
              </button>
              <div className="h-4 sm:h-6 w-px bg-cyan-300 flex-shrink-0" />
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                <h1
                  className="text-lg sm:text-2xl font-bold text-blue-600 flex-shrink-0"
                  style={{ fontFamily: "chillax" }}
                >
                  Clausia
                </h1>
              </div>
            </div>

            {/* Right side - Credits and Publish */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Credits Info - Desktop only */}
              <div className="hidden md:flex items-center">
                <div
                  className={`flex items-center px-4 py-2 rounded-full border ${
                    tokensUsed > credits
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-blue-100 border-blue-200/50 text-slate-700"
                  }`}
                >
                  <Coins
                    className={`w-4 h-4 mr-2 ${
                      tokensUsed > credits ? "text-red-500" : "text-blue-600"
                    }`}
                  />
                  <span className="font-medium text-sm">
                    {tokensUsed} / {credits} credits
                  </span>
                </div>
              </div>

              {/* Publish Button */}
              <button
                onClick={handlePublish}
                disabled={loading}
                className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl disabled:shadow-sm text-sm"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-1 sm:mr-2"></div>
                    <span className="hidden sm:inline">Publishing...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Publish Policy</span>
                    <span className="sm:hidden">Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Preview Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-blue-200/30">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start sm:items-center space-x-3 mb-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Privacy Policy Preview
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <p className="text-slate-600 text-sm sm:text-base">
              Review your generated privacy policy for{" "}
              <span className="font-semibold text-blue-600">
                {productName}
              </span>
            </p>
            <div className="flex items-center px-3 py-1.5 bg-slate-100 rounded-full border border-slate-300/50 text-xs sm:text-sm text-slate-600">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Preview Mode
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Credits Info */}
      <div className="md:hidden bg-blue-50/50 border-b border-blue-200/30 px-4 py-3">
        <div className="flex items-center text-sm">
          <Coins className="w-4 h-4 text-blue-600 mr-2" />
          <span className="font-medium text-slate-700">
            {tokensUsed} / {credits} credits used
          </span>
        </div>
      </div>

      {/* Main Content - Document Style */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/30 overflow-hidden">
            {/* Document Header */}
            <div className="bg-slate-50 border-b border-blue-200/30 px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    Privacy Policy
                  </h3>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base font-medium">
                    {productName}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs sm:text-sm">
                  <div className="px-3 py-1.5 bg-blue-100 rounded-full border border-blue-200/50">
                    <p className="text-slate-700 font-medium">
                      Created: {dayjs(date).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="px-4 sm:px-8 py-6 sm:py-8">{children}</div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col space-y-4 p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg">
            <div className="text-sm text-slate-600 text-center">
              <p className="font-semibold text-slate-800 mb-2">
                Ready to publish?
              </p>
              <p className="leading-relaxed">
                Your privacy policy will be made publicly accessible once
                published.
              </p>
            </div>
            <button
              onClick={handlePublish}
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-sm"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Publishing Policy...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Publish Privacy Policy
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <DashboardFooter/>
    </div>
  );
}
