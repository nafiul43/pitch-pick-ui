import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
} from "@/constants/auth"

export function setSessionCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`
}

export function clearSessionCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`
}

export function hasValidSession(): boolean {
  return document.cookie.split(";").some((part) => {
    const [name, value] = part.trim().split("=")
    return name === AUTH_COOKIE_NAME && value === AUTH_COOKIE_VALUE
  })
}
