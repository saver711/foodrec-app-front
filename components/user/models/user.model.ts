export type RefreshTokenResponse = {
  jwt: string
  refreshToken: string
}

export type UserResponse = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
  }
}

export type User = {
  jwt: string
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
}

export type LoginPayload = {
  identifier: string
  password: string
}
export type RegisterPayload = {
  username: string
  email: string
  password: string
}
