import { ROUTES } from "@/constants/routes"

export function DraftPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Draft</h1>
      <p className="text-muted-foreground mt-2">Placeholder for the draft.</p>
      <p className="text-muted-foreground mt-1 text-sm">Route: {ROUTES.DRAFT}</p>
    </div>
  )
}
