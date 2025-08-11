"use client";
import { CheckCircle } from "lucide-react";

export default function CreditPacks() {
  const packs = [
    {
      name: "Pro Pack",
      credits: 5000,
      price: 49,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "5000 Credits instantly",
        "Ideal for small projects",
        "One-time purchase",
      ],
    },
    {
      name: "Business Pack",
      credits: 20000,
      price: 149,
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "20000 Credits instantly",
        "Best value for teams",
        "One-time purchase",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Buy Credits
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose a credit pack that fits your needs. Your credits will be
            added instantly after payment.
          </p>
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packs.map((pack, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-lg hover:shadow-xl hover:border-purple-300/50 transition p-8 flex flex-col"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {pack.name}
                </h2>
                <p
                  className={`text-4xl font-extrabold bg-gradient-to-r ${pack.gradient} bg-clip-text text-transparent`}
                >
                  ₹{pack.price}
                </p>
                <p className="text-slate-600 mt-1">
                  {pack.credits.toLocaleString()} credits
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {pack.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r ${pack.gradient} hover:opacity-90 transition`}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
