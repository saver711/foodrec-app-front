import { useMutation } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { Link, Stack } from "expo-router"
import { Button, StyleSheet } from "react-native"
import {
  LoginPayload,
  RefreshTokenResponse,
  User,
  UserResponse,
} from "../../components/user/models/user.model"
import { baseURL, useAxios } from "../api/axios-util"
import { StrapiError } from "../api/models/strapi-error"
import { useUserStore } from "../store/user.store"
import { Text } from "../../components/Themed"
export default function LoginScreen() {
  const { afterSuccessAuth, user: currentUser } = useUserStore()
const request = useAxios()
  const { data, error, isPending, mutate } = useMutation<
    AxiosResponse<UserResponse>,
    StrapiError,
    LoginPayload,
    unknown
  >({
    mutationFn: (loginPayload: LoginPayload) =>
    axios.post<UserResponse>(`${baseURL}auth/local`, loginPayload),
    onSuccess: (userResponse) => {
      const user: User = {
        jwt: userResponse.data.jwt,
        ...userResponse.data.user,
      }
      afterSuccessAuth(user)
    },
    onError: (error) => {
      console.log(error.response.data)
    },
  })

  const { mutate: refresh } = useMutation<
    AxiosResponse<RefreshTokenResponse>,
    StrapiError
  >({
    mutationFn: () =>
    axios.post<RefreshTokenResponse>(`${baseURL}token/refresh`),
    onSuccess: (refreshTokenResponse) => {
      if (currentUser) {
        const user: User = {
          ...currentUser,
          jwt: refreshTokenResponse.data.jwt,
        }
        afterSuccessAuth(user)
      }
    },
    onError: (error) => {
      console.log(error.response.data)
    },
  })

  const login = () => {
    mutate({
      identifier: "aaa3",
      password: "123456",
    })
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Button title="login" onPress={login} />
      <Button title="login" onPress={login} />
      <Text>{baseURL}</Text>
      <Button title="login" onPress={login} />
      <Button title="refresh" onPress={()=>refresh()} />
      <Link href="/register">Register</Link>
    </>
  )
}

const styles = StyleSheet.create({})
