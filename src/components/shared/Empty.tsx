'use client'

import { motion } from "framer-motion"
import { IconMoodEmpty } from "@tabler/icons-react"

type EmptyProps = {
  title?: string
  message?: string
  classes?: string
  icon?: React.ReactNode
}

export default function Empty({
  title,
  message,
  classes = "text-white/60",
  icon = <IconMoodEmpty size={48} stroke={1.5} />
}: EmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-20 text-center ${classes}`}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-4"
      >
        {icon}
      </motion.div>

      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {message && <p className="text-sm max-w-md">{message}</p>}
    </motion.div>
  )
}
