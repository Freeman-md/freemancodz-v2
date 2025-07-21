import { ReactNode } from "react";

export default function Layout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <div>
            This is the Layout

            {children}
        </div>
    )
}