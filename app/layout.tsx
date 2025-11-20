// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header"; // Assuming a Header component exists

export const metadata: Metadata = {
  title: "NextBlog Unified (TSX)",
  description: "Unified Next.js App Router blog with Mongo, Clerk, Cloudinary, ImageKit"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        // You can customize the theme of Clerk components here
        variables: { colorPrimary: "#000" },
        elements: {
          formButtonPrimary: "bg-black border border-black border-solid hover:bg-white hover:text-black",
          socialButtonsBlockButton: "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
          socialButtonsBlockButtonText: "font-semibold",
          formFieldInput: "border border-gray-200",
        },
      }}
    >
      <html lang="en">
        <body>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
