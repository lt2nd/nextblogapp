// components/PostForm.tsx
"use client";
import { useState } from "react";
import type { Post } from "@/models/types"; // Assuming Post type is defined here

type Props = {
  onCreate?: (post: Post) => void;
};

export default function PostForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Use the specific error message from the API if available
        throw new Error(json.message || "Failed to create post");
      }

      setTitle("");
      setContent("");
      onCreate?.(json);
    } catch (err) {
      // Log the full error for debugging
      console.error("Post creation failed:", err);

      // Set a user-friendly error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card space-y-4" onSubmit={handleSubmit}>
      <h3>Create Post</h3>
      {error && <div className="p-2 text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button type="submit" disabled={loading || !title || !content}>
        {loading ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
}
