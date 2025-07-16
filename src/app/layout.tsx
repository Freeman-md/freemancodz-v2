import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import SocialIcons from "@/components/shared/SocialIcons";
import CustomCursor from "@/components/shared/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Freemancodz",
  description: "Built by Freeman Madudili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased relative cursor-none`}
      >
        <Header />
        <CustomCursor />

        <main className="pt-20">
          {children}
        </main>

        <SocialIcons />
      </body>
    </html>
  );
}
