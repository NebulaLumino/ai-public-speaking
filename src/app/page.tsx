"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function PublicSpeakingPage() {
  const [form, setForm] = useState({
    occasionType: "",
    audienceSize: "",
    audienceType: "",
    timeLimit: "",
    keyMessage: "",
    contentProvided: "",
    pastExperience: "",
    anxietyLevel: "5",
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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: `**Occasion Type:** ${form.occasionType || "Not specified"}
**Audience Size:** ${form.audienceSize || "Not specified"}
**Audience Type:** ${form.audienceType || "Not specified"}
**Time Limit:** ${form.timeLimit || "Not specified"}
**Key Message:** ${form.keyMessage || "Not specified"}
**Content Available:** ${form.contentProvided || "Not specified"}
**Past Experience:** ${form.pastExperience || "Not specified"}
**Anxiety Level (1-10):** ${form.anxietyLevel || "5"}`,
          options: {},
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setOutput(data.output || "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" }}>
      <header className="border-b px-6 py-5" style={{ borderColor: "hsl(210, 70%, 55%, 0.3)", backgroundColor: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold" style={{ color: "hsl(210, 70%, 55%)" }}>🎤 Public Speaking Coach</h1>
          <p className="text-gray-400 text-sm mt-1">Speech outlines, anxiety management, and delivery techniques for confident presentations</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl border" style={{ backgroundColor: "rgba(15,15,15,0.8)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Occasion Type *</label>
                <select name="occasionType" value={form.occasionType} onChange={handleChange} required className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/60">
                  <option value="">Select</option>
                  <option value="keynote">Keynote / Major Address</option>
                  <option value="presentation">Work Presentation</option>
                  <option value="pitch">Business Pitch</option>
                  <option value="interview">Interview / Elevator Pitch</option>
                  <option value="wedding">Wedding Toast</option>
                  <option value="graduation">Graduation Speech</option>
                  <option value="conference">Conference Talk</option>
                  <option value="team-meeting">Team Meeting Presentation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Audience Size *</label>
                <input type="text" name="audienceSize" value={form.audienceSize} onChange={handleChange} required placeholder="e.g., 10 people, 200, 50-100" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Audience Type *</label>
                <input type="text" name="audienceType" value={form.audienceType} onChange={handleChange} required placeholder="e.g., Executives, colleagues, clients, students" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Time Limit *</label>
                <input type="text" name="timeLimit" value={form.timeLimit} onChange={handleChange} required placeholder="e.g., 10 minutes, 5 minutes, 1 hour" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Key Message *</label>
                <textarea name="keyMessage" value={form.keyMessage} onChange={handleChange} required rows={2} placeholder="What is the ONE thing you want your audience to remember or do?" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Content Available</label>
                <textarea name="contentProvided" value={form.contentProvided} onChange={handleChange} rows={2} placeholder="Any data, stories, slides, or research you already have?" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Presentation Anxiety Level (1-10)</label>
                <input type="range" name="anxietyLevel" min="1" max="10" value={form.anxietyLevel} onChange={handleChange} className="w-full accent-blue-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>Calm</span><span>Very Nervous</span></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210, 70%, 55%)" }}>Past Speaking Experience</label>
                <textarea name="pastExperience" value={form.pastExperience} onChange={handleChange} rows={2} placeholder="Briefly describe your prior public speaking experience..." className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/60 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 text-sm" style={{ backgroundColor: loading ? "hsl(210, 70%, 45%)" : "hsl(210, 70%, 55%)" }}>
                {loading ? "Generating Speech..." : "Generate Speech Package"}
              </button>
            </form>
          </div>
          <div>
            {error && <div className="mb-6 p-4 bg-red-900/20 border border-red-500/40 rounded-xl text-red-300 text-sm">{error}</div>}
            {output ? (
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(15,15,15,0.8)", borderColor: "rgba(255,255,255,0.08)" }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "hsl(210, 70%, 55%)" }}>Your Public Speaking Package</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-200"><ReactMarkdown>{output}</ReactMarkdown></div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-white/10 p-12" style={{ backgroundColor: "rgba(15,15,15,0.4)" }}>
                <div className="text-center text-gray-500"><div className="text-4xl mb-4">🎤</div><p className="text-sm">Your speech package will appear here</p></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
