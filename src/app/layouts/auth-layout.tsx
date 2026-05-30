import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <header className="mb-8">
        <p className="text-lg font-semibold tracking-tight">Pitch Pick</p>
      </header>
      <main className="w-full max-w-sm">
        <Outlet />
      </main>
    </div>
  )
}
