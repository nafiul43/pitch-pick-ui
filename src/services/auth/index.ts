import {
  clearSessionCookie,
  hasValidSession,
  setSessionCookie,
} from "./session-cookie"

export { clearSessionCookie, hasValidSession, setSessionCookie }

export function signInWithGoogleStub(): void {
  setSessionCookie()
}

export function signOut(): void {
  clearSessionCookie()
}
