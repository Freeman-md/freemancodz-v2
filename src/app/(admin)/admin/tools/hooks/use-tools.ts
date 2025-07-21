// hooks/useTools.ts
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useTools() {
  const [tools, setTools] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTools = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("tools").select("name")
    if (!error && data) {
      setTools(data.map((t) => t.name))
    }
    setLoading(false)
  }

  const addTool = async (name: string) => {
    const { error } = await supabase.from("tools").insert({ name })
    if (!error) fetchTools()
  }

  const deleteTool = async (name: string) => {
    const { error } = await supabase.from("tools").delete().eq("name", name)
    if (!error) fetchTools()
  }

  useEffect(() => {
    fetchTools()
  }, [])

  return { tools, loading, addTool, deleteTool }
}
