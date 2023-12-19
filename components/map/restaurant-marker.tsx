import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Marker } from "react-native-maps"
import { Text, View } from "../Themed"
import { StyleSheet } from "react-native"
import { Location } from "../locations/models/locations.model"
import { useQuery } from "@tanstack/react-query"
import { request } from "../../app/api/axios-util"
import { StrapiWrapper } from "../../app/api/models/strapi-wrapper"
import { Restaurant } from "../restaurants/models/restaurants.model"

type RestaurantMarkerProps = {
  location: Location
}
export const RestaurantMarker = ({ location }: RestaurantMarkerProps) => {
  // FETCH RESTAURANT
  const {
    data,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
    refetch
  } = useQuery({
    queryKey: ["restaurants", location.attributes.restaurant.data.id],
    queryFn: () =>
      request.get<StrapiWrapper<Restaurant>>(
        `restaurants/${location.attributes.restaurant.data.id}`,
        {
          params: { "populate[restaurant]": "*" }
        }
      ),
    enabled: false
  })

  const fetchRestaurant = () => {}

  return (
    <Marker
      coordinate={{
        latitude: location.attributes.lat,
        longitude: location.attributes.long
      }}
    >
      <TouchableWithoutFeedback onPress={fetchRestaurant}>
        <View className="flex gap-1 items-center justify-center">
          <View style={styles.dot} />
          <Text>{location.attributes.restaurant.data.attributes.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Marker>
  )
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "red",
    width: 15,
    height: 15,
    borderRadius: 15
  }
})
