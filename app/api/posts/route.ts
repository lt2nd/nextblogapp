// app/api/posts/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import type { Post } from "@/models/types";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { requireBodyField, ValidationError } from "@/utils/validator";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const posts = await db.collection<Post>("posts").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to get posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    requireBodyField(body, "title");
    requireBodyField(body, "content");

    const postDocument = {
      title: body.title,
      content: body.content,
      authorId: userId, // Use the authenticated user's ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const { db } = await connectToDatabase();
    const result = await db.collection("posts").insertOne(postDocument);

    // Fetch the newly created document to return it
    const newPost = await db.collection("posts").findOne({ _id: result.insertedId });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("Failed to create post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
