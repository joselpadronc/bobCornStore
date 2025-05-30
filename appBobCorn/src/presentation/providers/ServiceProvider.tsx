import { createContext, useContext, type ReactNode } from "react"
import { UserService } from "../../core/services/UserService"
import { PurchaseService } from "../../core/services/PurcharseService"
import { LocalStorageUserRepository } from "../../infrastructure/repositories/LocalStorageUserRepository"
import { ApiPurchaseRepository } from "../../infrastructure/repositories/ApiPurchaseRepository"

interface Services {
  userService: UserService
  purchaseService: PurchaseService
}

const ServiceContext = createContext<Services | undefined>(undefined)

interface ServiceProviderProps {
  children: ReactNode
}

export function ServiceProvider({ children }: ServiceProviderProps) {
  // Initialize repositories
  const userRepository = new LocalStorageUserRepository()
  const purchaseRepository = new ApiPurchaseRepository()

  // Initialize services
  const userService = new UserService(userRepository)
  const purchaseService = new PurchaseService(purchaseRepository)

  const services: Services = {
    userService,
    purchaseService,
  }

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
}

export function useServices(): Services {
  const context = useContext(ServiceContext)
  if (context === undefined) {
    throw new Error("useServices must be used within a ServiceProvider")
  }
  return context
}
