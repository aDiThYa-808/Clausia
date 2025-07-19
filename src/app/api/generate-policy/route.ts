// app/api/generate/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { generatePrivacyPrompt, PolicyInput } from "@/lib/openai/generatePrompt";

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
      max_tokens: 2048,
    });

    const result = response.choices[0].message.content;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("[API_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
