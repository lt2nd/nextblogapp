// models/types.ts
export type Post = {
  _id: string;
  title: string;
  content?: string;
  authorId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  _id: string;
  postId: string;
  authorId?: string | null;
  text: string;
  createdAt: string;
};

export type UserDoc = {
  _id: string;
  clerkId?: string;
  name?: string | null;
  email?: string | null;
  createdAt: string;
};
