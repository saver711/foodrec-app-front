import { useMutation } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { Link, Stack } from "expo-router"
import { Button, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import {
    RegisterPayload,
    User,
    UserResponse,
} from "../../components/user/models/user.model"
import { baseURL, useAxios } from "../api/axios-util"
import { StrapiError } from "../api/models/strapi-error"
import { useUserStore } from "../store/user.store"

export default function RegisterScreen() {
  const { afterSuccessAuth } = useUserStore()
  const request = useAxios()
  const { data, error, isPending, mutate } = useMutation<AxiosResponse<UserResponse>, StrapiError, RegisterPayload, unknown>({
    mutationFn: (registerPayload: RegisterPayload) =>
    axios.post<UserResponse>(`${baseURL}auth/local/register`, registerPayload),
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

  const register = () => {
    mutate({
      username: "aaa3",
      email: "aaaa3@apdiv.com",
      password: "123456",
    })
  }

  return (
    <>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Button title="register" onPress={register} />
        <Button title="register" onPress={register} />
        <Button title="register" onPress={register} />
        <Link href="/login">Login</Link>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({})
