
// API Types
export interface ApiResponse {
  status_code?: number
  message?: string
  detail?: string
  count?: number  
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
