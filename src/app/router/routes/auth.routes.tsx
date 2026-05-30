import { Navigate, type RouteObject } from "react-router-dom"

import { AuthLayout } from "@/app/layouts/auth-layout"
import { ROUTES } from "@/constants/routes"
import { LoginPage } from "@/pages/auth/login-page"

export const authRoutes: RouteObject = {
  path: ROUTES.AUTH.ROOT,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ],
}
