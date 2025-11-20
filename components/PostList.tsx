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
          <p>{p.content}</p>
          <small>{new Date(p.createdAt).toLocaleString()}</small>
        </article>
      ))}
    </div>
  );
}
