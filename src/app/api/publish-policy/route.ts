import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { policyId } = await req.json(); // ✅ JSON 
  
    if (!policyId) {
      return NextResponse.json({ error: "Missing policyId" }, { status: 400 });
    }
  
    const supabase = await createSupabaseServerClient();
  
    const { error } = await supabase
      .from("Policy")
      .update({
        status: "completed",
        last_updated: new Date(),
      })
      .eq("id", policyId);
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ id: policyId }); // Return JSON
  }
  
