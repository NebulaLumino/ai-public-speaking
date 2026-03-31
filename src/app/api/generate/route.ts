import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { input, options } = await req.json();

  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `You are an expert public speaking coach and cognitive behavioral specialist for presentation anxiety. You help people become confident, authentic speakers by addressing both practical skills and psychological barriers. Draw from speech writing best practices, cognitive reframing, somatic anxiety management, and rehearsal science. Be warm, encouraging, and practical. Format output with clear markdown headers and structured sections.`,
      },
      {
        role: "user",
        content: `Generate a comprehensive public speaking package:

${input}

Please generate a complete package including:

# Public Speaking Coach

## 1. Speech Structure & Outline
A complete speech outline tailored to the topic, audience, and time limit.

## 2. Opening Hook
A compelling opening that grabs attention immediately.

## 3. Key Message Framing
How to distill your core message for maximum clarity and retention.

## 4. Closing With Impact
A strong, memorable closing with a clear call to action or insight.

## 5. Anxiety Management Techniques
CBT and somatic techniques for managing presentation anxiety before and during.

## 6. Rehearsal Strategy
How to practice for maximum confidence and natural delivery.

## 7. Visual Aid Recommendations
If slides or visuals are involved, what to include and what to avoid.

## 8. Q&A Preparation
Anticipated questions and how to handle them gracefully.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return Response.json({ output: response.choices[0].message.content });
}
