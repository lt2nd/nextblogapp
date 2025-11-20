// app/api/comments/route.ts
import { getCollection } from "@/lib/mongoHelpers";
import { v4 as uuidv4 } from "uuid";
import type { Comment } from "@/models/types";

export async function GET() {
  const col = await getCollection<Comment>("comments");
  const comments = await col.find({}).sort({ createdAt: -1 }).toArray();
  return new Response(JSON.stringify(comments), { status: 200, headers: { "content-type": "application/json" }});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId, authorId, text } = body || {};
    if (!postId || !text) return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400, headers: { "content-type": "application/json" }});

    const newComment: Comment = {
      _id: uuidv4(),
      postId,
      authorId: authorId || null,
      text,
      createdAt: new Date().toISOString()
    };

    const col = await getCollection<Comment>("comments");
    await col.insertOne(newComment);
    return new Response(JSON.stringify(newComment), { status: 201, headers: { "content-type": "application/json" }});
  } catch (err) {
    console.error("POST /api/comments error", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500, headers: { "content-type": "application/json" }});
  }
}
