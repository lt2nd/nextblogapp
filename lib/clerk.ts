// lib/clerk.ts
import { currentUser, auth } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

type AuthObject = Awaited<ReturnType<typeof auth>>;

/**
 * Get currently authenticated Clerk user server-side (or null)
 * This is a safe wrapper around `currentUser` that never throws for unauthenticated users.
 */
export async function getCurrentClerkUser(): Promise<User | null> {
  // currentUser() is already safe and returns null if the user is not authenticated.
  // The try/catch is redundant for the common case of an anonymous user.
  return await currentUser();
}

/**
 * requireAuthServer: returns auth object (userId etc.) or throws.
 * Use in protected API route handlers.
 * @throws {Error} If the user is not authenticated.
 */
export async function requireAuthServer(): Promise<AuthObject> {
  // `auth()` is an async function and must be awaited.
  const authPayload = await auth();
  if (!authPayload || !authPayload.userId) {
    throw new Error("Authentication required. User not found.");
  }
  return authPayload;
}
