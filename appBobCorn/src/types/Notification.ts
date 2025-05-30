export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

export enum NotificationType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}