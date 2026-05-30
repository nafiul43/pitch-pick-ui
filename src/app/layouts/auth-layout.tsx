import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { clearForcedTheme } from "@/hooks/use-theme"

export function AuthLayout() {
  useEffect(() => {
    clearForcedTheme()
  }, [])

  return (
    <div className="bg-background text-foreground min-h-svh">
      <Outlet />
    </div>
  )
}
