// app/api/webhooks/route.ts
import { NextResponse } from "next/server";
import { Webhook } from 'svix';
// The `headers` import is no longer needed here, as we'll pass the request object.
import type { WebhookEvent } from '@clerk/nextjs/server';

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  try {
    const event = await validateRequest(req);

    const eventType = event.type;
    console.log(`Received webhook event: ${eventType}`);

    // TODO: Handle the event based on its type (e.g., 'user.created', 'user.updated')
    // Example:
    // if (eventType === 'user.created') {
    //   // Add user to your database
    // }

    return NextResponse.json({ success: true, message: `Event ${eventType} processed.` }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook processing failed:", err.message);
      // Return a more specific status code if possible, e.g., 400 for validation errors
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("An unknown error occurred during webhook processing.");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function validateRequest(req: Request): Promise<WebhookEvent> {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set in environment variables.");
  }

  // Get the headers from the request
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error('Missing required Svix headers.');
  }

  // Get the raw body
  const body = await req.text();

  // Verify the payload
  const wh = new Webhook(WEBHOOK_SECRET);
  const event = wh.verify(body, {
    'svix-id': svix_id,
    'svix-timestamp': svix_timestamp,
    'svix-signature': svix_signature,
  }) as WebhookEvent;

  return event;
}
