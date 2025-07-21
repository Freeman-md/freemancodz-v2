import { ReactNode } from "react";

export default function Layout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <div className="container w-screen h-screen grid place-items-center">
            {children}
        </div>
    )
}