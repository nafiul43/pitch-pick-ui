import { Navigate } from "react-router-dom"

import { ROUTES } from "@/constants/routes"
import { hasValidSession } from "@/services/auth"

export function RootRedirect() {
  return (
    <Navigate
      to={hasValidSession() ? ROUTES.DASHBOARD : ROUTES.AUTH.LOGIN}
      replace
    />
  )
}
