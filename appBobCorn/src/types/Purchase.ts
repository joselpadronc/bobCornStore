export interface PurchaseRequest {
  username: string
}

export interface Purchase {
  id: string
  username: string
  createdAt: Date
  updatedAt: Date
}