import "./globals.css";
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
// import { inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trust Teens - Empowering African Teenagers",
  description:
    "We create value-based communities, learning experiences, and environments that help young people discover who they are, what they're capable of, and how they can shape the world around them.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={baloo.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
