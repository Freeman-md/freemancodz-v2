import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="container my-8">
            <Link href="/">
            <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Freemancodz"
            />
            </Link>
        </div>
    )
}