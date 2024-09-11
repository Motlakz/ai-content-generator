import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const lexend = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Content Blox - your best, multi-faceted AI content generator",
  description: "The best and last content generator you'll ever need, with a touch of AI to automate your basic needs and simplify your tedious tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={lexend.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
