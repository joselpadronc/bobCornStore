
// API Types
export interface ApiResponse<T = unknown> {
  data?: T
  status_code?: number
  message?: string
  detail?: string
}

// Configuration Types
export interface ApiConfig {
  baseUrl: string
  timeout: number
  headers: Record<string, string>
}

export * from "./User";
export * from "./Purchase";
export * from "./Notification";
