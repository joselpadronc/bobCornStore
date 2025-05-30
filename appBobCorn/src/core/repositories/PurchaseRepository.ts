import type { PurchaseRequest, ApiResponse } from "../../types"

export interface PurchaseRepository {
  create(request: PurchaseRequest): Promise<ApiResponse>
  findByUsername(userId: string): Promise<{count: number}>
}
