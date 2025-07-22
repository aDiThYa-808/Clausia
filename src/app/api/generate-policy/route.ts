import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { generatePrivacyPrompt, PolicyInput } from '@/lib/openai/generatePrompt'
import { parseRawPolicy } from '@/lib/parseRawPolicy'
import { createSupabaseServerClient } from '@/lib/supabase/supabaseServer'

export async function POST(req: Request) {


  try {
    // ✅ Validate API key
    const openaiKey = process.env.OPENAI_SECRET_KEY
    if (!openaiKey) {
      console.error('❌ Missing OPENAI_SECRET_KEY')
      return new NextResponse('Server misconfiguration', { status: 500 })
    }

    const openai = new OpenAI({ apiKey: openaiKey })

    // ✅ Get Supabase user
    const supabase = createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.warn('⚠️ Unauthorized request')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // ✅ Parse and log request input
    const data: PolicyInput = await req.json()
    console.log('📥 Policy input received:', data)

    const prompt = generatePrivacyPrompt(data)

    // ✅ Call OpenAI with safe guards
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a legal writing assistant for Indian digital products.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
    })

    const choice = response.choices?.[0]?.message?.content
    if (!choice) {
      console.error('❌ Invalid AI response:', response)
      return new NextResponse('No response from AI', { status: 500 })
    }

    const raw = choice.trim()
    const tokensUsed = response.usage?.total_tokens ?? 0
    const creditsUsed = 10

    // ✅ Parse raw policy with guard
    let parsed
    try {
      parsed = parseRawPolicy(raw)
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', raw)
      console.error(parseError)
      return new NextResponse('Parsing error', { status: 500 })
    }

    // ✅ Insert into Supabase
    const { error: insertError, data: inserted } = await supabase
      .from('policies')
      .insert({
        profileId: user.id,
        productName: parsed.productName,
        productType: parsed.productType,
        lastUpdated: new Date(parsed.lastUpdated),
        introduction: parsed.introduction,
        sectionTitles: parsed.sections.map((s) => s.title),
        sectionBodies: parsed.sections.map((s) => s.content),
        tokensUsed,
        creditsUsed,
        status: 'completed',
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('[INSERT_ERROR]', insertError)
      return new NextResponse('Failed to save policy', { status: 500 })
    }

    console.log('✅ Policy created with ID:', inserted.id)
    return NextResponse.json({ id: inserted.id })
  } catch (error) {
    console.error('[SERVER_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
