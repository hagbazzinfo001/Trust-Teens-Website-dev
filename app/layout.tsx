import "./globals.css";
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
 import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Baloo (for headings)
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo",
});

 

export const metadata: Metadata = {
  title: "Trust Teens - Empowering African Teenagers",
  description:
    "We create value-based communities, learning experiences, and environments that help young people discover who they are and what they can become.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable}`}>
      <body className="font-baloo ">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
