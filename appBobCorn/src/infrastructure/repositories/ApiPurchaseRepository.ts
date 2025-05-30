import type { PurchaseRepository } from "../../core/repositories/PurchaseRepository"
import type { Purchase } from "../../core/entities/Purchase"
import type { PurchaseRequest, ApiResponse } from "../../types"

export class ApiPurchaseRepository implements PurchaseRepository {
  private baseUrl: string

  constructor(baseUrl: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") {
    this.baseUrl = baseUrl
  }

  async create(request: PurchaseRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/purchases/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: request.username,
        }),
      })

      const responseData: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(responseData.detail ?? `HTTP error! status: ${response.status}`)
      }

      if (!responseData) {
        throw new Error("Error en la respuesta del servidor")
      }

      return responseData
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Error de conexión con el servidor")
    }
  }

  async findByUserId(username: string): Promise<Purchase[]> {
    try {
      const response = await fetch(`${this.baseUrl}/purchases/user/${username}/`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData: ApiResponse<Purchase[]> = await response.json()
      return  responseData.data ?? []
    } catch (error) {
      console.error("Error fetching user purchases:", error)
      return []
    }
  }
}
