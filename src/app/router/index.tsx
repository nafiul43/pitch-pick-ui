import { createBrowserRouter } from "react-router-dom"

import { appRoutes } from "@/app/router/routes/app.routes"
import { authRoutes } from "@/app/router/routes/auth.routes"
import { RootRedirect } from "@/components/routing/root-redirect"
import { ROUTES } from "@/constants/routes"

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <RootRedirect />,
  },
  authRoutes,
  appRoutes,
])
