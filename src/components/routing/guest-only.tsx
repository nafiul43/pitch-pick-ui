import { Navigate, Outlet } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { hasValidSession } from "@/services/auth"

export function GuestOnly() {
  if (hasValidSession()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
