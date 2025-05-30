import { useEffect, useState } from "react"
import { CropIcon as Corn, ShoppingCart } from "lucide-react"
import type { User } from "../../core/entities"
import { useServices } from "../providers/ServiceProvider"
import { useNotifications } from "../providers/NotificationProvider"

interface PurchaseViewProps {
  user: User
  onLogout: () => void
}

export function PurchaseView({ user, onLogout }: PurchaseViewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { purchaseService } = useServices()
  const { success, error } = useNotifications()
  const [countPurchase, setCountPurchase] = useState(0);

  useEffect(() => {
    handleGetPurchasesByUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePurchase = async () => {
    setIsLoading(true)

    try {
      const response = await purchaseService.createPurchase({
        username: user.username,
      })

      handleGetPurchasesByUsername();

      success(
        "¡Compra exitosa!",
        response.message || "Tu compra de maíz ha sido procesada correctamente."
      )
    } catch (e) {
      error(
        "Error en la compra",
        (e as Error).message || "No se pudo procesar tu compra. Por favor, intenta nuevamente.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetPurchasesByUsername = async () => {
    try {
      const response = await purchaseService.getPurchasesByUsername(user.username)

      setCountPurchase(response.count || countPurchase);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setCountPurchase(countPurchase || 0);
    }
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Hola, {user.username}!</h1>
          <p className="text-gray-600">Bienvenido a la tienda de maíz</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Corn className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Cantidad de maiz comprada con exito: {countPurchase} unidades</h2>
              </div>
            </div>
          </div>

          <div className="p-6">
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando compra...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Maíz
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Cambiar usuario
          </button>
        </div>
      </div>
    </div>
  )
}
