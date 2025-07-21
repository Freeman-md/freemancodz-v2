import Header from "@/components/shared/Header";
import SocialIcons from "@/components/shared/SocialIcons";
import DesktopMenu from "@/components/shared/DesktopMenu";
import CursorWrapper from "@/components/shared/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      <DesktopMenu />

      <CursorWrapper />

      <main className="pt-20">{children}</main>

      <SocialIcons />
    </div>
  );
}
