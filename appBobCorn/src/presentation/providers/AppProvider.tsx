import type { ReactNode } from "react"
import { ServiceProvider } from "./ServiceProvider"
import { NotificationProvider } from "./NotificationProvider"

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ServiceProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ServiceProvider>
  )
}
