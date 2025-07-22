import Header from "@/components/shared/Header";
import SocialIcons from "@/components/shared/SocialIcons";
import DesktopMenu from "@/components/shared/DesktopMenu";
import CursorWrapper from "@/components/shared/CustomCursor";
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
