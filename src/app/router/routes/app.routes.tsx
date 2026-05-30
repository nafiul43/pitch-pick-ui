import { type RouteObject } from "react-router-dom"

import { AppLayout } from "@/app/layouts/app-layout"
import { ROUTES } from "@/constants/routes"
import { DashboardPage } from "@/pages/dashboard/dashboard-page"
import { DraftPage } from "@/pages/draft/draft-page"
import { LeaguesPage } from "@/pages/leagues/leagues-page"
import { TeamPage } from "@/pages/team/team-page"

export const appRoutes: RouteObject = {
  element: <AppLayout />,
  children: [
    {
      path: ROUTES.DASHBOARD,
      element: <DashboardPage />,
    },
    {
      path: ROUTES.LEAGUES,
      element: <LeaguesPage />,
    },
    {
      path: ROUTES.DRAFT,
      element: <DraftPage />,
    },
    {
      path: ROUTES.TEAM,
      element: <TeamPage />,
    },
  ],
}
