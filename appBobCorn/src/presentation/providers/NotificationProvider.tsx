import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { NotificationService } from "../../infrastructure/services/NotificationService"
import type { Notification } from "../../types"

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  success: (title: string, message: string, duration?: number) => void
  error: (title: string, message: string, duration?: number) => void
  warning: (title: string, message: string, duration?: number) => void
  info: (title: string, message: string, duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

const notificationService = new NotificationService()

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotifications)
    return unsubscribe
  }, [])

  const contextValue: NotificationContextType = {
    notifications,
    addNotification: (notification) => notificationService.addNotification(notification),
    removeNotification: (id) => notificationService.removeNotification(id),
    success: (title, message, duration) => notificationService.success(title, message, duration),
    error: (title, message, duration) => notificationService.error(title, message, duration),
    warning: (title, message, duration) => notificationService.warning(title, message, duration),
    info: (title, message, duration) => notificationService.info(title, message, duration),
  }

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
