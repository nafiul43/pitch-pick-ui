import { Navigate, Outlet } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { hasValidSession } from "@/services/auth"

export function RequireAuth() {
  if (!hasValidSession()) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />
  }

  return <Outlet />
}
