// app/api/posts/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to get post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
    }

    const { title, content } = await req.json();

    // Basic validation
    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection("posts").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, content, updatedAt: new Date().toISOString() } },
      { returnDocument: "after" } // This option returns the document after the update
    );

    if (!result || !result.value) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
