// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import type { Post } from "@/models/types";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/api/health");
        const j = await r.json();
        setMessage(j.message);
      } catch (err) {
        setMessage("Failed to fetch message from backend.");
        console.error(err);
      }

      try {
        const p = await (await fetch("/api/posts")).json();
        setPosts(p);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <p>Message from backend: <strong>{message}</strong></p>
      <PostForm onCreate={(post) => setPosts([post, ...posts])} />
      <PostList posts={posts} />
    </>
  );
}
