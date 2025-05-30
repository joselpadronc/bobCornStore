import type { PurchaseRepository } from "../repositories/PurchaseRepository"
import type { PurchaseRequest, ApiResponse } from "../../types"

export class PurchaseService {
  private purchaseRepository: PurchaseRepository;

  constructor(purchaseRepository: PurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async createPurchase(request: PurchaseRequest): Promise<ApiResponse> {
    if (!request.username || request.username.trim().length === 0) {
      throw new Error("Nombre de usuario requerido")
    }

    try {
      const response = await this.purchaseRepository.create(request)
      return response
    } catch (error) {
      throw new Error((error as Error).message || "Error al crear la compra")
    }
  }
}
