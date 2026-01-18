"use client";

import { Transaction } from "@/types/transactionType";

export default function BillingHistory({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // Loading state
  if (transactions === undefined) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Loading transactions...
              </h3>
              <p className="text-gray-500 text-center">
                Please wait while we fetch your transaction history.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state (null or failed to load)
  if (transactions === null) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 text-red-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Unable to load transactions
              </h3>
              <p className="text-gray-500 text-center mb-6">
                There was an error loading your transaction history. Please try
                again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invalid data type
  if (!Array.isArray(transactions)) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="w-16 h-16 text-amber-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Invalid data format
              </h3>
              <p className="text-gray-500 text-center">
                The transaction data received is in an unexpected format.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

return (
    <div className="flex justify-center p-4 mt-8">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Transaction History
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Track all your payment transactions and their current status
          </p>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {transactions.length ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-4"
              >
                {/* Header with Amount and Status */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{tx.amount?.toLocaleString() || "0"}
                    </span>
                    <span className="text-sm text-gray-500 ml-2 uppercase">
                      {tx.currency || "INR"}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      tx.status === "paid"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : tx.status === "failed"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        tx.status === "paid"
                          ? "bg-emerald-600"
                          : tx.status === "failed"
                          ? "bg-red-600"
                          : "bg-amber-600"
                      }`}
                    ></span>
                    {tx.status}
                  </span>
                </div>

                {/* Date */}
                <div className="mb-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      {tx.created_at
                        ? new Date(tx.created_at).toLocaleDateString()
                        : "-"}
                    </span>
                    {tx.created_at && (
                      <span className="ml-2 text-gray-500">
                        {new Date(tx.created_at).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment ID */}
                {tx.razorpay_payment_id ? (
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 mb-1">Payment ID</p>
                      <code className="text-xs font-mono text-gray-800 break-all">
                        {tx.razorpay_payment_id}
                      </code>
                    </div>
                    <button
                      onClick={() => {
                        if (tx.razorpay_payment_id) {
                          navigator.clipboard.writeText(tx.razorpay_payment_id);
                        }
                      }}
                      className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                      title="Copy Payment ID"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Payment ID</p>
                    <span className="text-xs text-gray-400">N/A</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No transactions found
              </h3>
              <p className="text-sm text-gray-500">
                Your transaction history will appear here once you make your
                first payment.
              </p>
            </div>
          )}

          {/* Mobile Summary */}
          {transactions.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {transactions.length} transaction
                  {transactions.length !== 1 ? "s" : ""}
                </span>
                <span className="font-semibold text-gray-900">
                  Total: ₹
                  {transactions
                    .reduce((sum, tx) => sum + (tx.amount || 0), 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Currency
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.length ? (
                  transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {tx.created_at
                              ? new Date(tx.created_at).toLocaleDateString()
                              : "-"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {tx.created_at
                              ? new Date(tx.created_at).toLocaleTimeString()
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{tx.amount?.toLocaleString() || "0"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-600 uppercase">
                          {tx.currency || "INR"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                            tx.status === "paid"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : tx.status === "failed"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              tx.status === "paid"
                                ? "bg-emerald-600"
                                : tx.status === "failed"
                                ? "bg-red-600"
                                : "bg-amber-600"
                            }`}
                          ></span>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {tx.razorpay_payment_id ? (
                          <div className="flex items-center">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700 group-hover:bg-gray-200 transition-colors">
                              {tx.razorpay_payment_id}
                            </code>
                            <button
                              onClick={() => {
                                if (tx.razorpay_payment_id) {
                                  navigator.clipboard.writeText(
                                    tx.razorpay_payment_id
                                  );
                                }
                              }}
                              className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Copy Payment ID"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-16 h-16 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No transactions found
                        </h3>
                        <p className="text-gray-500">
                          Your transaction history will appear here once you
                          make your first payment.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Desktop Footer with summary */}
          {transactions.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>
                  Showing {transactions.length} transaction
                  {transactions.length !== 1 ? "s" : ""}
                </span>
                <span>
                  Total: ₹
                  {transactions
                    .reduce((sum, tx) => sum + (tx.amount || 0), 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
