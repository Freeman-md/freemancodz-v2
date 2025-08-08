import type { Metadata } from "next";
import { Bungee, Plaster, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
  title: {
    default: "Freeman Madudili | Full-Stack .NET & JavaScript Developer",
    template: "%s | Freeman Madudili",
  },
  description:
    "Freeman Madudili is a full-stack .NET and JavaScript developer building cloud-native apps, SaaS platforms, and high-quality UI/UX experiences. Available for hire.",
  keywords: [
    "Freeman Madudili",
    "full-stack developer",
    ".NET",
    "JavaScript",
    "Next.js",
    "cloud-native",
    "SaaS",
    "UI/UX",
    "portfolio",
    "developer for hire",
    "software engineer",
    "web development",
    "cloud apps",
    "SaaS builder",
    "UI designer",
    "UX designer",
    "React",
    "TypeScript",
    "frontend",
    "backend",
    "API",
    "software solutions",
  ],
  openGraph: {
    title: {
      default: "Freeman Madudili | Full-Stack .NET & JavaScript Developer",
      template: "%s | Freeman Madudili",
    },
    description:
      "Freeman Madudili builds cloud-native apps, SaaS platforms, and high-quality UI/UX experiences. Available for hire.",
    url: "https://freemanmadudili.com",
    siteName: "Freeman Madudili Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freeman Madudili Portfolio OG Image",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Freeman Madudili | Full-Stack .NET & JavaScript Developer",
      template: "%s | Freeman Madudili",
    },
    description:
      "Freeman Madudili builds cloud-native apps, SaaS platforms, and high-quality UI/UX experiences. Available for hire.",
    images: ["/images/og-image.png"],
    site: "@freemanmadudili",
    creator: "@freemanmadudili",
  },
  authors: [{ name: "Freeman Madudili", url: "https://freemanmadudili.com" }],
  creator: "Freeman Madudili",
  publisher: "Freeman Madudili",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${bungee.variable} ${plaster.variable} antialiased relative`}
      >
        {children}
      </body>

      <Analytics />
    </html>
  );
}
