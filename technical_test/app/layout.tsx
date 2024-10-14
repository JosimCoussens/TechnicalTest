/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <Link href="/list">List</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
