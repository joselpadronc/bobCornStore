import { User } from "../entities/User"
import type { UserRepository } from "../repositories/UserRepository"

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(username: string): Promise<User> {
    if (!username || username.trim().length < 2) {
      throw new Error("El nombre de usuario debe tener al menos 2 caracteres")
    }

    const existingUser = await this.userRepository.findByUsername(username)

    if (existingUser) {
      return existingUser
    }

    const newUser = User.create(username)

    if (!newUser.isValid()) {
      throw new Error("Nombre de usuario inválido")
    }

    await this.userRepository.save(newUser)
    return newUser
  }

  async getCurrentUser(): Promise<User | null> {
    return this.userRepository.getCurrentUser()
  }

  async logoutUser(): Promise<void> {
    await this.userRepository.clear()
  }
}
