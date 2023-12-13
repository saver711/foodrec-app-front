import axios from "axios"
import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios"
import { Platform } from "react-native"

const baseURL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_API_URL
// const baseURL = 'http://localhost:1337/api/'
export const request = axios.create({
  baseURL,
})

// , headers: {
// Authorization: `Bearer token`,
// "Content-Type": `application/json`,
// "Content-Type": `multipart/form-data`,
// Accept: 'text/html'
// }
