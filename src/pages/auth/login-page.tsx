import { ROUTES } from "@/constants/routes"

export function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-muted-foreground mt-2">
        Placeholder for authentication.
      </p>
      <p className="text-muted-foreground mt-1 text-sm">
        Route: {ROUTES.AUTH.LOGIN}
      </p>
    </div>
  )
}
