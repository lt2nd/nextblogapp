// app/layout.tsx
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'NextBlog',
  description: 'A blog built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}