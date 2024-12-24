import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])

  return <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
}
