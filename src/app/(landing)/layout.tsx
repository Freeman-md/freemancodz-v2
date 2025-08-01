import Header from "@/components/shared/header";
import SocialIcons from "@/components/shared/social-icons";
import DesktopMenu from "@/components/shared/desktop-menu";
import CursorWrapper from "@/components/shared/custom-cursor";
import '@/app/layout-root.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:cursor-none bg-background text-foreground">
      <Header />

      <DesktopMenu />

      <CursorWrapper />

      <main className="pt-20">{children}</main>

      <SocialIcons />
    </div>
  );
}
