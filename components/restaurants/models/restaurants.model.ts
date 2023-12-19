import { AuditKeys } from "../../../app/api/models/audit-keys"
import { LocationAttributes } from "../../locations/models/locations.model"

export type Restaurant = {
  id: number
  attributes: RestaurantAttributes
}

export type RestaurantAttributes = {
  name: string
  locale: string
  meals: Meals
  locations: Locations
  logo: RestaurantLogo
} & AuditKeys

type Locations = {
  data: {
    id: number
    attributes: LocationAttributes
  }[]
}

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

export type RestaurantLogo = {
  data: { id: number; attributes: RestaurantLogoAttributes }
}

export type RestaurantLogoAttributes = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
} & AuditKeys

export type Formats = {
  thumbnail: Thumbnail
}

export type Thumbnail = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}
