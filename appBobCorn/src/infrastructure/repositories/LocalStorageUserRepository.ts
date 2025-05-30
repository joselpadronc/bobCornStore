import { User } from "../../core/entities/User"
import type { UserRepository } from "../../core/repositories/UserRepository"

const USER_STORAGE_KEY = "corn_app_current_user"

export class LocalStorageUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const userData = {
      id: user.id,
      username: user.username,
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }

  async findByUsername(username: string): Promise<User | null> {
    const currentUser = await this.getCurrentUser()
    return currentUser?.username === username ? currentUser : null
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY)
      if (!userData) return null

      const parsed = JSON.parse(userData)
      return new User(parsed.id, parsed.username)
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      return null
    }
  }

  async clear(): Promise<void> {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}
