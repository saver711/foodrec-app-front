import * as SecureStore from "expo-secure-store"
import { create } from "zustand"
import { User } from "../../components/user/models/user.model"
type UserStore = {
  isLoadingUserFromLocalStorage: boolean
  user: User | null
  init: () => void
  afterSuccessAuth: (payload: User) => void
  logout: () => void
}
export const useUserStore = create<UserStore>((set, get) => {
  return {
    user: null,
    isLoadingUserFromLocalStorage: true,
    init: async () => {
      const storedUser = await SecureStore.getItemAsync("user")

      set({ isLoadingUserFromLocalStorage: false })
      if (!storedUser) return
      const user: User = JSON.parse(storedUser)
      set({ user })
    },
    afterSuccessAuth: async (user) => {
      set({ user })
      const userData = JSON.stringify(user)
      try {
        await SecureStore.setItemAsync("user", userData)
      } catch (error) {
        console.log("error in SecureStore usage", error)
      }
    },
    logout: async () => {
      set({ user: null })
      await SecureStore.deleteItemAsync("user")
    },
  }
})
