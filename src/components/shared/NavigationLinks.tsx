import Link from "next/link"

export default function NavigationLinks() {
    const links = [
        {
            text: "About",
            url: "#about"
        },
        {
            text: "Projects",
            url: "#projects"
        },
        {
            text: "Work",
            url: "#work"
        },
        {
            text: "Contact",
            url: "#contact"
        },
    ]
    return (
        <nav className="my-20">
            <ul className="flex flex-col space-y-4 items-end uppercase font-medium">
                {
                    links.map(({ text, url }) => (
                        <li key={text} className="transition duration-500 hover:text-primary active:text-primary focus:text-primary">
                            <Link
                                href={url}
                            >
                            {text}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}