// lib/mongoHelpers.ts
import { connectToDatabase } from "./mongodb";
import type { Collection, Document } from "mongodb";

/**
 * A convenience wrapper to get a typed MongoDB collection.
 * @template T - The type of the documents in the collection. Defaults to a generic Document.
 * @param {string} name - The name of the collection.
 * @returns {Promise<Collection<T>>} A promise that resolves to a MongoDB Collection instance.
 */
export async function getCollection<T extends Document = Document>(
  name:string
): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection<T>(name);
}
