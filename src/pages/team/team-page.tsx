import { ROUTES } from "@/constants/routes"

export function TeamPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Team</h1>
      <p className="text-muted-foreground mt-2">Placeholder for team management.</p>
      <p className="text-muted-foreground mt-1 text-sm">Route: {ROUTES.TEAM}</p>
    </div>
  )
}
