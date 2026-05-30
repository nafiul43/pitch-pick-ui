import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AuthBrandPanel } from "@/components/common/auth-brand-panel";
import {
  applyThemeToDocument,
  getStoredTheme,
  getSystemTheme,
} from "@/hooks/use-theme";

export function AuthLayout() {
  useEffect(() => {
    applyThemeToDocument("dark");

    return () => {
      const theme = getStoredTheme() ?? getSystemTheme();
      applyThemeToDocument(theme);
    };
  }, []);

  return (
    <div className="font-sans bg-background text-foreground grid min-h-svh lg:grid-cols-2">
      <AuthBrandPanel />
      <div className="bg-secondary flex min-h-svh items-center justify-center p-6 lg:p-12">
        <Outlet />
      </div>
    </div>
  );
}
