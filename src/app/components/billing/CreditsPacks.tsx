"use client";

import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster,toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const packs: (Pack & { id: number })[] = [
    {
      id: 1, // This matches creditPacks key '1'
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
      id: 2, // This matches creditPacks key '2'
      name: "Business Pack",
      credits: 20000,
      price: 149,
      gradient: "from-purple-500 to-pink-500",
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
          //setError('Failed to load payment system. Please refresh the page and try again.');
          toast.error('Failed to load payment system. Please refresh the page and try again.')
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
      toast.warning(error)
      return;
    }

    const pack = packs[packIndex];

    setLoading(true);
    setError(null);

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
              toast.error(error)
              setLoading(false);
              return;
            }

            toast.success("Payment Successful!", {
              description: `${pack.credits.toLocaleString()} credits added to your account`,
              duration: 6000,
              action: {
                label: "View Credits",
                  onClick: () => router.push("/dashboard"),
                },
              });
            setLoading(false);
          } catch (err) {
            setError("Payment verification failed. Please contact support if amount was deducted.");
            toast.error(error)
            console.error(err);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            //console.log("Payment popup dismissed");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      toast.error(error)
      setLoading(false);
    }
  }

return (
  <div className="min-h-screen bg-gray-50">
    <Toaster richColors/>
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Buy Credits
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose a credit pack that fits your needs. Your credits will be added instantly after payment.
        </p>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-700">Processing payment...</p>
            </div>
          </div>
        </div>
      )}

      {/* Credit Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {packs.map((pack, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
          >
            {/* Pack Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pack.name}
              </h2>
              <div className="mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  ₹{pack.price.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600">
                {pack.credits.toLocaleString()} credits
              </p>
             <p className="text-sm text-gray-500 mt-1">
                {index === 0 ? (
                  "Standard pack"
                ) : (
                  `Save ${Math.round(((packs[0].price / packs[0].credits) - (pack.price / pack.credits)) / (packs[0].price / packs[0].credits) * 100)}% off`
                )}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {pack.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Buy Button */}
            <button
              className="w-full px-6 py-3 rounded-lg font-medium text-white shadow-sm hover:shadow-md bg-cyan-500 hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !razorpayLoaded}
              onClick={() => handlePurchase(index)}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : !razorpayLoaded ? (
                "Loading..."
              ) : (
                "Buy Now"
              )}
            </button>

            {/* Payment info */}
            <p className="text-xs text-gray-500 text-center mt-3">
              Secure payment via Razorpay
            </p>
          </div>
        ))}
      </div>

      {/* Legal links and footer info */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-6 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Payment
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Delivery
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-400 px-4">
          <span>By purchasing, you agree to our</span>
          <div className="flex items-center space-x-4">
            <a 
              href="/legal/termsofservice"
              className="text-blue-600 hover:text-blue-700 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <span>and</span>
            <a 
              href="/legal/privacypolicy"
              className="text-blue-600 hover:text-blue-700 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
);
}