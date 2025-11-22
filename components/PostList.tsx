// components/PostList.tsx
import { Post } from "@/models/types";

type Props = { posts: Post[] };

export default function PostList({ posts }: Props) {
  if (!posts || posts.length === 0) return <p>No posts yet</p>;
  return (
    <div>
      {posts.map((p) => (
        <article key={p._id} className="card">
          <h3>{p.title}</h3>
          {/* 
            Using dangerouslySetInnerHTML to render HTML from the post content.
            WARNING: Only use this if you trust the source of the HTML content 
            to prevent Cross-Site Scripting (XSS) attacks.
          */}
          <div dangerouslySetInnerHTML={{ __html: p.content || "" }} />
          <small>{new Date(p.createdAt).toLocaleString()}</small>
        </article>
      ))}
    </div>
  );
}
