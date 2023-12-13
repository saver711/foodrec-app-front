import { AuditKeys } from "../../../app/api/models/audit-keys"

export type Restaurant = {
  id: number
  attributes: RestaurantAttributes
}

export type RestaurantAttributes = {
  name: string
  locale: string
  meals: Meals
  locations: Locations
} & AuditKeys

export type Locations = {
  data: {
    id: number
    attributes: LocationAttributes
  }[]
}

export type LocationAttributes = {
  name: string
  lat: string
  long: string
  googleMapsLink: string
} & AuditKeys

export type Meals = {
  data: {
    id: number
    attributes: MealAttributes
  }[]
}

export type MealAttributes = {
  name: string
  locale: string
} & AuditKeys
