import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return NextResponse.json({ error: userError?.message || "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification fields" }, { status: 400 });
    }

    // Check if this payment was already processed
    const { data: existingTransaction } = await supabase
      .from("transactions")
      .select("id")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (existingTransaction) {
      return NextResponse.json({ success: true, message: "Payment already processed" });
    }

    // Verify Razorpay signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(process.env.RAZORPAY_KEY_SECRET_TEST!),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`)
    );

    const generatedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Get order details from Razorpay
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID_TEST}:${process.env.RAZORPAY_KEY_SECRET_TEST}`).toString('base64');
    
    const response = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
      headers: { Authorization: `Basic ${auth}` }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to verify payment with Razorpay" }, { status: 500 });
    }

    const order = await response.json();

    // Validate the order belongs to this user
    if (!order.notes || order.notes.userId !== userData.user.id) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 403 });
    }

    const creditsToAdd = parseInt(order.notes.credits);

    // Get current user credits
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", userData.user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
    }

    const newCredits = (profile.credits || 0) + creditsToAdd;

    // Update user credits
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", userData.user.id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update credits" }, { status: 500 });
    }

    // Record the transaction
    const { error: insertError } = await supabase
      .from("transactions")
      .insert({
        user_id: userData.user.id,
        razorpay_order_id,
        razorpay_payment_id,
        amount: order.amount/100,
        currency: order.currency,
        status: "paid"
      });

    if (insertError) {
      console.error("Failed to record transaction:", insertError);
      // Credits are already added, so we'll just log this error
    }

    return NextResponse.json({ 
      success: true,
      creditsAdded: creditsToAdd,
      newTotal: newCredits
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}