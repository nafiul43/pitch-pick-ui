import { createBrowserRouter, Navigate } from "react-router-dom"

import { appRoutes } from "@/app/router/routes/app.routes"
import { authRoutes } from "@/app/router/routes/auth.routes"
import { ROUTES } from "@/constants/routes"

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  authRoutes,
  appRoutes,
])
