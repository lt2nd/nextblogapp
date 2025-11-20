// app/api/users/route.ts
import { getCollection } from "@/lib/mongoHelpers";
import { v4 as uuidv4 } from "uuid";
import type { UserDoc } from "@/models/types";

export async function GET() {
  const col = await getCollection<UserDoc>("users");
  const users = await col.find({}).toArray();
  return new Response(JSON.stringify(users), { status: 200, headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.clerkId && !body?.email) return new Response(JSON.stringify({ message: "Missing clerkId or email" }), { status: 400, headers: { "content-type": "application/json" }});

    const newUser: UserDoc = {
      _id: uuidv4(),
      clerkId: body.clerkId || null,
      name: body.name || null,
      email: body.email || null,
      createdAt: new Date().toISOString()
    };

    const col = await getCollection<UserDoc>("users");
    await col.insertOne(newUser);
    return new Response(JSON.stringify(newUser), { status: 201, headers: { "content-type": "application/json" }});
  } catch (err) {
    console.error("POST /api/users error", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500, headers: { "content-type": "application/json" }});
  }
}
