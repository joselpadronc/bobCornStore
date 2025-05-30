import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react"
import { useNotifications } from "../providers/NotificationProvider"
import { NotificationType } from "../../types"
import { cn } from "../../shared/utils/cn"

export function Notification() {
  const { notifications, removeNotification } = useNotifications()

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case NotificationType.WARNING:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case NotificationType.ERROR:
        return <XCircle className="w-5 h-5 text-red-600" />
      case NotificationType.INFO:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return "border-green-200 bg-green-50"
      case NotificationType.WARNING:
        return "border-yellow-200 bg-yellow-50"
      case NotificationType.ERROR:
        return "border-red-200 bg-red-50"
      case NotificationType.INFO:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "border rounded-lg shadow-lg p-4 animate-in slide-in-from-right-full duration-300",
            getStyles(notification.type),
          )}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{notification.title}</h4>
              <p className="text-sm mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
