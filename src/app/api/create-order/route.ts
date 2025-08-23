import Razorpay from "razorpay";
import { creditPacks } from "@/types/creditPackType";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Move environment check inside the function
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {  //these razorpay keys are for test mode. change them for prod!!!
    console.error("Razorpay credentials are missing in environment variables.");
    return NextResponse.json({ error: "Payment service unavailable" }, { status: 503 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const supabase = await createSupabaseServerClient();

  const {
    data: userData,
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return NextResponse.json({ error: userError?.message || "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const packId = Number(body.packId);
    
    console.log("Received packId:", packId);
    console.log("Available creditPacks:", Object.keys(creditPacks));
    console.log("creditPacks structure:", creditPacks);

    // Check if packId is valid
    if (!Number.isInteger(packId)) {
      return NextResponse.json({ error: "Invalid packId format" }, { status: 400 });
    }

    // Check if the pack exists
    if (!creditPacks[packId]) {
      return NextResponse.json({ 
        error: `Pack not found. Available packs: ${Object.keys(creditPacks).join(', ')}` 
      }, { status: 400 });
    }

    const pack = creditPacks[packId];

    // Validate pack structure
    if (!pack.amount || !pack.credits) {
      return NextResponse.json({ error: "Invalid pack configuration" }, { status: 500 });
    }

    // Razorpay needs amount in paise (₹1 = 100 paise)
    // Receipt must be <= 40 characters
    const shortReceipt = `rcpt_${Date.now().toString().slice(-8)}_${packId}`;
    
    const options = {
      amount: pack.amount * 100,
      currency: "INR",
      receipt: shortReceipt, // This will be ~20 characters
      notes: {
        userId: userData.user.id,
        packId: packId.toString(),
        credits: pack.credits.toString()
      }
    };

    console.log("Creating Razorpay order with options:", options);

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      credits: pack.credits,
      key: process.env.RAZORPAY_KEY_ID, // public key for checkout
    }, { status: 200 });
    
  } catch (error: unknown) {
    console.error("Error creating Razorpay order:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json({ 
      error: "Failed to create order. Please try again." 
    }, { status: 500 });
  }
}