import { PlusIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  url: string;
  text?: string;
  icon?: ReactNode;
} & React.ComponentProps<typeof Button>;

export default function LinkButton({
  url,
  text,
  variant = "outline",
  icon = <PlusIcon />,
  ...rest
}: Props) {
  return (
    <Button asChild variant={variant} {...rest}>
      <Link href={url} className="flex items-center gap-2">
        {icon}
        {text}
      </Link>
    </Button>
  );
}
