import Header from "@/components/shared/header";
import SocialIcons from "@/components/shared/social-icons";
import DesktopMenu from "@/components/shared/desktop-menu";
import CursorWrapper from "@/components/shared/custom-cursor";
import '@/app/layout-root.css'
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:cursor-none bg-secondary min-h-screen h-full text-foreground">
      <Header />

      <DesktopMenu />

      <CursorWrapper />

      <main className="pt-20">{children}</main>

      <ScrollToTop />

      <SocialIcons />
    </div>
  );
}
