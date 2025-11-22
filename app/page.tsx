// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import type { Post } from "@/models/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
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
      <h1>Recent Posts</h1>
      <p>Check out the latest articles from our authors.</p>
      <PostList posts={posts} />
    </>
  );
}
