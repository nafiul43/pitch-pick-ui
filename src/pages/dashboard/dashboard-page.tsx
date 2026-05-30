import { ROUTES } from "@/constants/routes"

export function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Placeholder for the dashboard.
      </p>
      <p className="text-muted-foreground mt-1 text-sm">
        Route: {ROUTES.DASHBOARD}
      </p>
    </div>
  )
}
