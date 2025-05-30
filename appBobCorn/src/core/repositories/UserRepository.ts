import type { User } from "../entities/User"

export interface UserRepository {
  save(user: User): Promise<void>
  findByUsername(username: string): Promise<User | null>
  getCurrentUser(): Promise<User | null>
  clear(): Promise<void>
}
