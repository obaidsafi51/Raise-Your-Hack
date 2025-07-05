import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raise Your Hack - AI Developer Assistant",
  description:
    "AI-powered developer assistant for code generation, refactoring, and PR reviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-black">
          <header className="border-b border-yellow-400/20 bg-black/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link
                    href="/"
                    className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                  >
                    Athena
                  </Link>
                  <div className="hidden md:flex space-x-6">
                    <Link
                      href="/"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Home
                    </Link>
                    <Link
                      href="/prs"
                      className="text-sm font-medium hover:text-primary"
                    >
                      PR Reviews
                    </Link>
                    <Link
                      href="/analytics"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Analytics
                    </Link>
                    <Link
                      href="/settings"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </div>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
