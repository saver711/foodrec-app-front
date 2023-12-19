import { AuditKeys } from "../../../app/api/models/audit-keys"
import { RestaurantAttributes } from "../../restaurants/models/restaurants.model"

export type Location = {
  id: number
  attributes: LocationAttributes & { restaurant: { data: LocationRestaurant } }
}
export type LocationAttributes = {
  name: string
  lat: number
  long: number
  googleMapsLink: string
} & AuditKeys

type LocationRestaurant = {
  id: number
  attributes: Omit<RestaurantAttributes, "logo">
}
