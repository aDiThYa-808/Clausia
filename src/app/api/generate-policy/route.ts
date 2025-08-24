//sends prompt to openai's gpt 4.1 mini, parses the response and inserts it into the table

import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  generatePrivacyPrompt,
  PolicyInput,
} from "@/lib/openai/generatePrompt";
import { parseRawPolicy } from "@/lib/openai/parseRawPolicy";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServerClient";

export async function POST(req: Request) {
  try {
    const openaiKey = process.env.OPENAI_SECRET_KEY;

    if (!openaiKey) {
      //console.error('Missing OPENAI_SECRET_KEY')
      return new NextResponse("Server misconfiguration.", { status: 500 });
    }

    const openai = new OpenAI({ apiKey: openaiKey });

    const supabase = await createSupabaseServerClient();

    //get logged in user info
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      //console.warn("Unauthorized request");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //user input 
    const data: PolicyInput = await req.json();

    //console.log("Policy input received:", data);

    const prompt = generatePrivacyPrompt(data);

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini", 
      messages: [
        {
          role: "system",
          content:
            "You are a legal writing assistant for Indian digital products.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

    const choice = response.choices?.[0]?.message?.content;
    if (!choice) {
      //console.error("Invalid AI response:", response);
      return new NextResponse("No response from AI", { status: 500 });
    }

    const raw = choice.trim();
    const tokensUsed = response.usage?.total_tokens ?? 0;
    const creditsUsed = 10;

    let parsed;
    try {
      //divides raw text into different sections using regex
      parsed = parseRawPolicy(raw);
    } catch (parseError) {
      //console.error("Failed to parse AI response:", raw);
      console.error(parseError);
      return new NextResponse("Parsing error", { status: 500 });
    }

    // Supabase insert 
    const { error: insertError, data: inserted } = await supabase
      .from("Policy")
      .insert({
        profile_id: user.id,
        product_name: parsed.productName,
        product_type: parsed.productType,
        last_updated: new Date(parsed.lastUpdated).toISOString(),
        introduction: parsed.introduction,
        section_titles: parsed.sections.map((s) => s.title),
        section_bodies: parsed.sections.map((s) => s.content),
        tokens_used: tokensUsed,
        credits_used: creditsUsed,
        updated_at: new Date(),
        status: "draft",
      })
      .select("id")
      .single();

    if (insertError) {
      //console.error("[INSERT_ERROR]", insertError.message || insertError.details || insertError);
      return new NextResponse("Failed to save policy", { status: 500 });
    }

    //console.log("Policy created with ID:", inserted.id);
    return NextResponse.json({ id: inserted.id });
  } catch (error) {
    //const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
