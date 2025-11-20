// types/globals.d.ts
import { MongoClient } from "mongodb";

declare module '*.css';

// Extend the NodeJS.Global interface to include our cached MongoDB connection
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};