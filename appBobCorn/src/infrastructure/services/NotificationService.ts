import { type Notification, NotificationType } from "../../types"

export class NotificationService {
  private notifications: Notification[] = []
  private listeners: ((notifications: Notification[]) => void)[] = []

  addNotification(notification: Omit<Notification, "id">): void {
    const id = crypto.randomUUID()
    const newNotification: Notification = { ...notification, id }

    this.notifications = [...this.notifications, newNotification]
    this.notifyListeners()

    // Auto remove after duration (default 5 seconds)
    const duration = notification.duration || 5000
    setTimeout(() => {
      this.removeNotification(id)
    }, duration)
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.notifyListeners()
  }

  getNotifications(): Notification[] {
    return [...this.notifications]
  }

  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener)

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getNotifications()))
  }

  // Convenience methods
  success(title: string, message: string, duration?: number): void {
    this.addNotification({ type: NotificationType.SUCCESS, title, message, duration })
  }

  error(title: string, message: string, duration?: number): void {
    this.addNotification({ type: NotificationType.ERROR, title, message, duration })
  }

  warning(title: string, message: string, duration?: number): void {
    this.addNotification({ type: NotificationType.WARNING, title, message, duration })
  }

  info(title: string, message: string, duration?: number): void {
    this.addNotification({ type: NotificationType.INFO, title, message, duration })
  }
}
