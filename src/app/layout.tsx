import type { Metadata } from "next";
import { Bungee, Plaster, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import SocialIcons from "@/components/shared/SocialIcons";
import DesktopMenu from "@/components/shared/DesktopMenu";
import CursorWrapper from "@/components/shared/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

const plaster = Plaster({
  variable: "--font-plaster",
  subsets: ["latin"],
  weight: "400",
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
        className={`${poppins.className} ${bungee.variable} ${plaster.variable} antialiased relative md:cursor-none`}
      >
        <Header />

        <DesktopMenu />

        <CursorWrapper />

        <main className="pt-20">
          {children}
        </main>

        <SocialIcons />
      </body>
    </html>
  );
}
