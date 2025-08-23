"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { Plus, Calendar, Tag, CheckCircle, Clock } from "lucide-react";

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


 return (
 <div className="min-h-screen bg-gray-50">
   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     {/* Header Section */}
     <div className="mb-8">
       <h2 className="text-3xl font-bold text-gray-900 mb-2">
         Your Policies
       </h2>
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
         <p className="text-gray-600 text-lg">
           Manage and track your privacy policies. You have{" "}
           <span className="font-semibold text-purple-600">
             {credits ?? 0} credits
           </span>{" "}
           remaining.
         </p>
         <button
           onClick={handleNewPolicy}
           className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
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
             className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md cursor-pointer hover:border-gray-300 transition-all group"
           >
             <div className="flex items-start justify-between mb-4">
               <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-purple-700">
                 {policy.product_name}
               </h3>
               <div className="flex-shrink-0 ml-2">
                 {policy.status === "completed" ? (
                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                     <CheckCircle className="w-4 h-4 text-white" />
                   </div>
                 ) : (
                   <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                     <Clock className="w-4 h-4 text-white" />
                   </div>
                 )}
               </div>
             </div>

             <div className="space-y-3 mb-4">
               <div className="flex items-center text-sm text-gray-600">
                 <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-2">
                   <Tag className="w-3 h-3 text-gray-600" />
                 </div>
                 <span className="capitalize font-medium">
                   {policy.product_type}
                 </span>
               </div>
               <div className="flex items-center text-sm text-gray-500">
                 <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-2">
                   <Calendar className="w-3 h-3 text-gray-500" />
                 </div>
                 <span>Updated {getRelativeTime(policy.last_updated)}</span>
               </div>
             </div>

             <div className="flex items-center justify-between">
               <span
                 className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${
                   policy.status === "completed"
                     ? "bg-green-50 text-green-700 border border-green-200"
                     : "bg-yellow-50 text-yellow-700 border border-yellow-200"
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
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg
               className="w-8 h-8 text-gray-400"
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
           <h3 className="text-2xl font-bold text-gray-900 mb-3">
             No policies yet
           </h3>
           <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
             Create your first privacy policy to get started. Our AI will
             help you generate comprehensive, compliant policies in minutes.
           </p>
           <button
             onClick={handleNewPolicy}
             className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
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
