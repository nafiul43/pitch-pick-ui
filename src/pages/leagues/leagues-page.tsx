import { ROUTES } from "@/constants/routes"

export function LeaguesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Leagues</h1>
      <p className="text-muted-foreground mt-2">Placeholder for leagues.</p>
      <p className="text-muted-foreground mt-1 text-sm">
        Route: {ROUTES.LEAGUES}
      </p>
    </div>
  )
}
