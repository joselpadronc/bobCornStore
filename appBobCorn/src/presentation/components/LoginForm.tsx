import type React from "react"

import { useState } from "react"
import { User } from "lucide-react"
import { useNotifications } from "../providers/NotificationProvider"

interface LoginFormProps {
  onLogin: (username: string) => Promise<void>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { error } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      error("Error", "Por favor ingresa un nombre de usuario")
      return
    }

    setIsLoading(true)
    try {
      await onLogin(username.trim())
    } catch (err) {
      error("Error", (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Tienda de Maíz</h1>
          <p className="text-gray-600 mt-2">Ingresa tu nombre de usuario para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Cargando...
              </div>
            ) : (
              "Continuar"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
