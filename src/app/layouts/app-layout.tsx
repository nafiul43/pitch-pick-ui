import { NavLink, Outlet } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { cn } from "@/utils"

const navItems = [
  { to: ROUTES.DASHBOARD, label: "Dashboard" },
  { to: ROUTES.LEAGUES, label: "Leagues" },
  { to: ROUTES.DRAFT, label: "Draft" },
  { to: ROUTES.TEAM, label: "Team" },
] as const

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b px-6 py-4">
        <p className="mb-4 text-lg font-semibold tracking-tight">Pitch Pick</p>
        <nav className="flex flex-wrap gap-4 text-sm">
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
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
