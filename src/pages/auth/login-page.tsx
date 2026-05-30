import { GoogleSignInButton } from "@/components/forms/google-sign-in-button";

export function LoginPage() {
  return (
    <div className="auth-glass-card text-card-foreground w-full max-w-md rounded-lg p-8">
      <h2 className="text-white text-2xl font-semibold tracking-tight">
        Sign in to continue
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Use your Google account to access Pitch Pick.
      </p>
      <div className="mt-8">
        <GoogleSignInButton />
      </div>
    </div>
  );
}
