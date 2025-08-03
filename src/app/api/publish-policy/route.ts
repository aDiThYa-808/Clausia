// api/generate-policy/route.ts

import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { policyId } = await req.json(); // ✅ JSON 
  
    if (!policyId) {
      return NextResponse.json({ error: "Missing policyId" }, { status: 400 });
    }
  
    const supabase = await createSupabaseServerClient();

    const {
      data: userData,
      error: userError,
    } = await supabase.auth.getUser();

    if(userError || !userData.user) return NextResponse.json({ error:userError?.message }, { status: 401 });

    const userId = userData.user?.id
  
    const{data:tokensData,error:tokensError} = await supabase
    .from("Policy")
    .select("tokens_used , status , profile_id")
    .eq("id",policyId)
    .single()

    
    if(tokensError) return NextResponse.json({ error: tokensError.message }, { status: 500 });
    if(!tokensData) return NextResponse.json({error: "failed to retrive tokensData"},{status:404})
    if(tokensData?.profile_id != userId) return NextResponse.json({error: "Unauthorized"},{status:403})

    const{data:creditsData, error:creditsError} = await supabase
    .from("profiles")
    .select("credits")
    .eq("id",userId)
    .single()

    if(creditsError) return NextResponse.json({ error: creditsError.message }, { status: 500 });

    if(tokensData?.status == 'completed') return NextResponse.json({error: "policy already completed"},{status:400})

    if(tokensData?.tokens_used == null || creditsData?.credits == null) return NextResponse.json({error:"missing tokens or credits data"},{status:500})

    const updatedCredits = creditsData?.credits - tokensData?.tokens_used;

    if(updatedCredits < 0) return NextResponse.json({ error: "Insufficient credits" }, { status: 400 });

    const{error:creditsUpdateError} =await supabase
    .from("profiles")
    .update({
      credits: updatedCredits
    })
    .eq("id",userId)

    if(creditsUpdateError) return NextResponse.json({ error: creditsUpdateError.message }, { status: 500 });

    const { error: policyError } = await supabase
    .from("Policy")
    .update({
      status: "completed",
      last_updated: new Date(),
    })
    .eq("id", policyId);

  if (policyError) {
    return NextResponse.json({ error: policyError.message }, { status: 500 });
  }

  
    return NextResponse.json({ id: policyId }); // Return JSON
  }
  
