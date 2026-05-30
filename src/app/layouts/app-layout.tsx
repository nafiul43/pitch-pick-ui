import { useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

import { ThemeSwitcher } from "@/components/common/theme-switcher"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import {
  applyThemeToDocument,
  getStoredTheme,
  getSystemTheme,
} from "@/hooks/use-theme"
import { signOut } from "@/services/auth"
import { cn } from "@/utils"

const navItems = [
  { to: ROUTES.DASHBOARD, label: "Dashboard" },
  { to: ROUTES.LEAGUES, label: "Leagues" },
  { to: ROUTES.DRAFT, label: "Draft" },
  { to: ROUTES.TEAM, label: "Team" },
] as const

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const theme = getStoredTheme() ?? getSystemTheme()
    applyThemeToDocument(theme)
  }, [])

  function handleLogout() {
    signOut()
    navigate(ROUTES.AUTH.LOGIN)
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b px-6 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">Pitch Pick</p>
            <nav className="mt-4 flex flex-wrap gap-4 text-sm">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      isActive && "text-foreground font-medium",
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button type="button" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
