import Image from "next/image";
import Link from "next/link";
import NavigationLinks from "./NavigationLinks";

export default function Header() {
  return (
    <header className="py-6 fixed w-full backdrop-blur max-h-16">
      <div className="container flex justify-between space-x-4 items-start">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt="Freemancodz"
          />
        </Link>

        <NavigationLinks />
      </div>
    </header>
  );
}
