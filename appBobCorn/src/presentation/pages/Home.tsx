import { useState, useEffect } from "react"
import type { User } from "../../core/entities"
import { useServices } from "../providers/ServiceProvider"
import { useNotifications } from "../providers/NotificationProvider"
import { LoginForm } from "../components/LoginForm"
import { PurchaseView } from "../components/PurchaseView"
import { Notification } from "../components/Notification"

export function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { userService } = useServices()
  const { success } = useNotifications()

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error("Error loading current user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCurrentUser()
  }, [userService])

  const handleLogin = async (username: string) => {
    const user = await userService.loginUser(username)
    setCurrentUser(user)
    success("¡Bienvenido!", `Hola ${username}, ya puedes realizar tu compra de maíz.`)
  }

  const handleLogout = async () => {
    try {
      await userService.logoutUser()
      setCurrentUser(null)
      success("Sesión cerrada", "Has cerrado sesión correctamente.")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Notification />

      {!currentUser ? <LoginForm onLogin={handleLogin} /> : <PurchaseView user={currentUser} onLogout={handleLogout} />}
    </div>
  )
}
