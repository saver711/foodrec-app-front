import axios, { HttpStatusCode } from "axios"
import "core-js/stable/atob"
import * as dayjs from "dayjs"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { jwtDecode } from "jwt-decode"
import { Platform } from "react-native"
import { useToast } from 'react-native-paper-toast'
import {
  RefreshTokenResponse,
  User,
} from "../../components/user/models/user.model"
import { useUserStore } from "../store/user.store"
import { StrapiError } from "./models/strapi-error"
export const baseURL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    // : process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_ANDROID_API_URL

export const useAxios = () => {
  const { logout, user: currentUser, afterSuccessAuth } = useUserStore()
  const toaster = useToast();
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${currentUser?.jwt}`,
    },
  })

  axiosInstance.interceptors.request.use(async (req) => {
    let isExpired = false
    const storedUser = await SecureStore.getItemAsync("user")
    if (storedUser) {
      const user: User = JSON.parse(storedUser)
      const accessToken = user.jwt
      req.headers.Authorization = `Bearer ${accessToken}`

      const decodedToken = jwtDecode(accessToken)
      if (decodedToken.exp) {
        isExpired = dayjs.unix(decodedToken.exp).diff(new Date()) < 1
      }
    }

    if (!isExpired) return req

    try {
      console.log('Refreshing the token')
      
      const response = await axios.post<RefreshTokenResponse>(
        `${baseURL}token/refresh/`
      )
      if (currentUser) {
        const user: User = {
          ...currentUser,
          jwt: response.data.jwt,
        }
        afterSuccessAuth(user)
      }

      req.headers.Authorization = `Bearer ${response.data.jwt}`
    } catch (err) {
      const error = err as StrapiError
      if (error?.response.data.error.status === HttpStatusCode.Unauthorized) {
        logout()
        router.replace("/login")
        toaster.show({message: "Session ended, Please login again."})
      }
    }

    return req
  })

  return axiosInstance
}
