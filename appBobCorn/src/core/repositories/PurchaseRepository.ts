import type { Purchase } from "../entities/Purchase"
import type { PurchaseRequest, ApiResponse } from "../../types"

export interface PurchaseRepository {
  create(request: PurchaseRequest): Promise<ApiResponse>
  findByUserId(userId: string): Promise<Purchase[]>
}
