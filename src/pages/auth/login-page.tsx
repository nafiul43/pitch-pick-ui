import { AuthBrandPanel } from "@/components/common/auth-brand-panel"
import { GoogleSignInButton } from "@/components/forms/google-sign-in-button"

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthBrandPanel />
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="bg-card text-card-foreground w-full max-w-md rounded-lg border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Sign in to continue
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Use your Google account to access Pitch Pick.
          </p>
          <div className="mt-8">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </div>
  )
}
