
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { generatePrivacyPrompt, PolicyInput } from "@/lib/openai/generatePrompt";
import { PrivacyPolicySchema } from "@/lib/zod/privacypolicySchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(req: Request) {
  try {
    const data: PolicyInput = await req.json();

    const prompt = generatePrivacyPrompt(data);

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a legal writing assistant for Indian digital products.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

    const raw = response.choices[0].message.content;

    // Defensive parsing
    let parsed;
    try {
      const cleaned = raw?.replace(/```json|```/g, "").trim(); // Clean out code fences
      parsed = JSON.parse(cleaned || "");
    } catch (jsonErr) {
      console.error("[PARSE_ERROR]", jsonErr);
      return NextResponse.json(
        { error: "AI response was not valid JSON." },
        { status: 500 }
      );
    }

    // Validate with Zod
    const result = PrivacyPolicySchema.safeParse(parsed);
    if (!result.success) {
      console.error("[VALIDATION_ERROR]", result.error.flatten());
      return NextResponse.json(
        { error: "AI response failed validation." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: result.data });
  } catch (error) {
    console.error("[API_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

