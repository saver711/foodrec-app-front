import { Text } from "../Themed"
import { Restaurant } from "./models/restaurants.model"

type RestaurantDetailsProps = {
  restaurant: Restaurant
}
export const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return <Text>Name: {restaurant.attributes.name}</Text>
}
