// components/Navbar.tsx
// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// Note: For SignedIn, SignedOut, and UserButton to work,
// you need to have Clerk configured in your project.
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// A placeholder for Clerk components if not installed.
// Declare them outside the component to prevent re-creation on every render.
const SignedIn: React.FC<React.PropsWithChildren> = () => null;
const SignedOut = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const UserButton = () => <div className="user-button-placeholder"></div>;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link href="/" className="logo">
          {/* Assuming you have a logo.png in your /public folder */}
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span>Yellow Blog</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="desktop-nav">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
          <SignedOut>
            <Link href="/login">
              <button className="login-btn">Login 👋</button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/saved-posts" className={pathname === "/saved-posts" ? "active" : ""}>
              Saved Posts
            </Link>
            <Link href="/posts/new" className="new-post-btn">
              New Post
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* MOBILE MENU */}
        <div className="mobile-menu">
          <div className="hamburger" onClick={() => setOpen((prev) => !prev)}>
            <div className={`line ${open && "line1-open"}`}></div>
            <div className={`line ${open && "line2-open"}`}></div>
            <div className={`line ${open && "line3-open"}`}></div>
          </div>

          <div className={`mobile-links ${open ? "menu-open" : "menu-closed"}`}>
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <SignedOut>
              <Link href="/login" onClick={() => setOpen(false)}>
                <button className="login-btn">Login 👋</button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/saved-posts" onClick={() => setOpen(false)}>
                Saved Posts
              </Link>
              <Link href="/posts/new" className="new-post-btn" onClick={() => setOpen(false)}>
                New Post
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}