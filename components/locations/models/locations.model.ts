import { AuditKeys } from "../../../app/api/models/audit-keys"
import { RestaurantAttributes } from "../../restaurants/models/restaurants.model"

export type Location = {
  id: number
  attributes: LocationAttributes & { restaurant: { data: LocationRestaurant | null } }
}
export type LocationAttributes = {
  name: string
  lat: number
  long: number
  address: string
  googleMapsLink: string
} & AuditKeys

type LocationRestaurant = {
  id: number
  attributes: RestaurantAttributes
}


export type SavedLocation = {
  id:number
  locationId?:number
  name:string
  lat: number
  long: number
  address: string
}