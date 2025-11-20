// components/CommentForm.tsx
"use client";
import { useState } from "react";

export default function CommentForm({ postId, onCreate }: { postId: string; onCreate?: (c: any) => void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, text })
      });
      const json = await res.json();
      setText("");
      onCreate?.(json);
    } catch (err) {
      console.error(err);
      alert("Failed to create comment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 8 }}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
      <button type="submit" disabled={loading}>{loading ? "Posting..." : "Comment"}</button>
    </form>
  );
}
