import Link from "next/link"
import {
  IconFolder,
  IconBriefcase,
  IconCertificate,
  IconTool,
  IconLayoutGrid,
  IconLayersDifference,
  IconBrain,
  IconInfoCircle,
  IconMail,
} from "@tabler/icons-react"

const cards = [
  { title: "Projects", href: "/admin/projects", icon: IconFolder },
  { title: "Experiences", href: "/admin/experiences", icon: IconBriefcase },
  { title: "Certifications", href: "/admin/certifications", icon: IconCertificate },
  { title: "Tools", href: "/admin/tools", icon: IconTool },
  { title: "Services", href: "/admin/services", icon: IconLayoutGrid },
  { title: "Categories", href: "/admin/categories", icon: IconLayersDifference },
  { title: "Modules", href: "/admin/modules", icon: IconBrain },
  { title: "Meta Info", href: "/admin/site-meta", icon: IconInfoCircle },
  { title: "Contact Messages", href: "/admin/contact-messages", icon: IconMail },
]

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all group bg-white dark:bg-muted"
        >
          <div className="flex items-center gap-3">
            <card.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="font-semibold text-sm">{card.title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
