"use client";

import { useState } from "react";
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

function getDeepSeekClient() {
  return createDeepSeek({
    apiKey: "sk-48987c1a1dc246ecb1b52a01647e8b16",
  });
}

export default function PublicSpeakingPage() {
  const [form, setForm] = useState({
    occasionType: "",
    audienceSize: "",
    audienceType: "",
    timeLimit: "",
    keyMessage: "",
    contentProvided: "no",
    providedContent: "",
    anxietyLevel: "5",
    pastExperience: "",
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const { text } = await generateText({
        model: getDeepSeekClient()("deepseek-chat"),
        system: `You are an expert public speaking coach and cognitive behavioral therapist specializing in presentation anxiety. You help people become confident, authentic speakers by addressing both practical skills and the psychological barriers to speaking. Draw from speech writing best practices, cognitive reframing techniques, somatic anxiety management, and rehearsal science. Be warm, encouraging, and practical. Format output with clear markdown headers and structured sections.`,
        prompt: `Generate a comprehensive public speaking and presentation anxiety management package for someone with the following situation:

**Occasion Type:** ${form.occasionType || "Not specified"}
**Audience Size:** ${form.audienceSize || "Not specified"}
**Audience Type:** ${form.audienceType || "Not specified"}
**Time Limit:** ${form.timeLimit || "Not specified"}
**Key Message to Convey:** ${form.keyMessage || "Not specified"}
**Is Content Provided?** ${form.contentProvided === "yes" ? "Yes - see below" : "No, please generate the speech"}
**Provided Content:** ${form.providedContent || "N/A"}
**Current Anxiety Level (1-10):** ${form.anxietyLevel}
**Past Speaking Experience:** ${form.pastExperience || "None or minimal"}

Please generate a complete public speaking package including:

# Public Speaking & Anxiety Management Package

## 1. Speech / Outline
${form.contentProvided === "yes"
  ? "Structured adaptation and delivery notes for the provided content."
  : "A full speech tailored to the occasion, audience, time limit, and key message."}

## 2. Audience Adaptation Notes
How to connect with this specific audience type and size.

## 3. Anxiety Profile Assessment
Analysis of the anxiety level and likely sources of nervous system activation.

## 4. Anxiety Management Toolkit
- Grounding techniques (5-4-3-2-1, body scan, feet on floor)
- Breath work protocols (box breathing, physiological sigh)
- Cognitive reframing scripts (reframe "nervousness" as "readiness")
- Pre-speech ritual (what to do 10 minutes before)

## 5. Rehearsal Schedule
A 5-session practice schedule with specific goals for each session.

## 6. Practice Delivery Notes
How to rehearse effectively — in front of mirror, recording, small audience.

## 7. Visual Aid Suggestions
Recommendations for slides, props, or visual support.

## 8. Q&A Preparation Brief
Anticipated questions and model answers for the Q&A session.

## 9. Day-of Anxiety Protocol
The complete plan for the day of the speech — morning routine, arrival, backstage.

## 10. Post-Event Reflection Template
Questions to answer after the speech for continuous improvement.
`,
      });
      setOutput(text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)" }}
    >
      <header className="border-b border-purple-500/20 px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-300">
            🎙️ Public Speaking & Presentation Anxiety Coach
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Generate a personalized speech, practice schedule, and anxiety management toolkit
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Occasion Type *
              </label>
              <select
                name="occasionType"
                value={form.occasionType}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Select occasion</option>
                <option value="interview">Job Interview</option>
                <option value="wedding toast">Wedding Toast</option>
                <option value="work presentation">Work Presentation</option>
                <option value="conference">Conference Talk</option>
                <option value="classroom">Classroom / Academic</option>
                <option value="community event">Community Event</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Audience Size *
              </label>
              <select
                name="audienceSize"
                value={form.audienceSize}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Select size</option>
                <option value="1-5">1–5 (intimate)</option>
                <option value="6-20">6–20 (small group)</option>
                <option value="21-50">21–50 (medium group)</option>
                <option value="51-200">51–200 (large group)</option>
                <option value="200+">200+ (auditorium)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Audience Type *
              </label>
              <input
                type="text"
                name="audienceType"
                value={form.audienceType}
                onChange={handleChange}
                required
                placeholder="e.g., Senior leadership, peers, clients, general public"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Time Limit *
              </label>
              <input
                type="text"
                name="timeLimit"
                value={form.timeLimit}
                onChange={handleChange}
                required
                placeholder="e.g., 10 minutes, 5 minutes"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Key Message to Convey *
              </label>
              <textarea
                name="keyMessage"
                value={form.keyMessage}
                onChange={handleChange}
                required
                rows={2}
                placeholder="What is the ONE thing you want the audience to remember or take away?"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Do you already have content/speech text?
              </label>
              <select
                name="contentProvided"
                value={form.contentProvided}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="no">No — generate a speech for me</option>
                <option value="yes">Yes — I'll provide it below</option>
              </select>
            </div>

            {form.contentProvided === "yes" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-300 mb-1.5">
                  Your Speech / Content
                </label>
                <textarea
                  name="providedContent"
                  value={form.providedContent}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Paste or write your speech content here..."
                  className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Anxiety Level (1–10) *
              </label>
              <select
                name="anxietyLevel"
                value={form.anxietyLevel}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    {i + 1} — {i + 1 <= 3 ? "Mild nerves" : i + 1 <= 6 ? "Moderate anxiety" : i + 1 <= 8 ? "High anxiety" : "Very high anxiety"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Past Speaking Experience
              </label>
              <textarea
                name="pastExperience"
                value={form.pastExperience}
                onChange={handleChange}
                rows={2}
                placeholder="Describe any previous public speaking experience..."
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
          >
            {loading ? "Generating Your Speaking Package..." : "Generate Public Speaking Package"}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {output && (
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-4">Your Speaking Package</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-200 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
