"use client";

import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

type Pack = {
  id?: number;
  name: string;
  credits: number;
  price: number;
  gradient: string;
  features: string[];
};

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayHandlerResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open(): void;
  close(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function CreditPacks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const packs: (Pack & { id: number })[] = [
    {
      id: 1, // This matches your creditPacks key '1'
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
      id: 2, // This matches your creditPacks key '2'
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

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) {
          if (window.Razorpay) {
            setRazorpayLoaded(true);
            resolve(true);
          }
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setError('Failed to load payment system. Please refresh the page and try again.');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true);
    } else {
      loadRazorpayScript();
    }

    // Cleanup function
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  async function handlePurchase(packIndex: number) {
    if (!razorpayLoaded || !window.Razorpay) {
      setError("Payment system is still loading. Please try again in a moment.");
      return;
    }

    const pack = packs[packIndex];

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Call your backend to create the order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId: pack.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create order");
      }

      const orderData: {
        orderId: string;
        amount: number;
        currency: string;
        credits: number;
        key: string;
      } = await res.json();

      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Clausia",
        description: `Buy ${packs[packIndex].credits} credits`,
        handler: async (response) => {
          try {
            // Call your backend to verify the payment
            const verifyRes = await fetch("/api/verify-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: orderData.amount,
                currency: orderData.currency,
              }),
            });

            if (!verifyRes.ok) {
              const err = await verifyRes.json();
              setError(err.error || "Payment verification failed");
              setLoading(false);
              return;
            }

            const verifyData = await verifyRes.json();
            setSuccessMessage(
              `Payment successful! Credits added: ${verifyData.creditsAdded}. Total credits: ${verifyData.newTotal}`
            );
            setLoading(false);
          } catch (err) {
            setError("Payment verification failed. Please contact support if amount was deducted.");
            console.error(err);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment popup dismissed");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {!razorpayLoaded && !error && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50">
          Loading payment system...
        </div>
      )}
      
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
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-600 font-semibold">{successMessage}</p>
            </div>
          )}
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
                className={`mt-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r ${pack.gradient} hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading || !razorpayLoaded}
                onClick={() => handlePurchase(index)}
              >
                {loading ? "Processing..." : !razorpayLoaded ? "Loading..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}