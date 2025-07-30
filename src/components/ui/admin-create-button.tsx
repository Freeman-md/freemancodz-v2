import { PlusIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

type AdminCreateButtonProps = {
    url: string;
    text: string;
}

export default function AdminCreateButton({
    url,
    text,
} : AdminCreateButtonProps ) {
    return (
        <Button asChild variant="outline">
          <div>
            <PlusIcon />
            <Link href={url}>{text}</Link>
          </div>
        </Button>
    )
}