import { Dispatch, SetStateAction } from "react"
import { StyleSheet } from "react-native"
import { Marker } from "react-native-maps"
import { Text, View } from "../Themed"
import { Location } from "../locations/models/locations.model"

type RestaurantMarkerProps = {
  location: Location
  setActiveRestaurantLocation: Dispatch<SetStateAction<Location | null>>
  openRestaurantModal: () => void
}
export const RestaurantMarker = ({
  location,
  setActiveRestaurantLocation,
  openRestaurantModal
}: RestaurantMarkerProps) => {
  // FETCH RESTAURANT

  const fetchRestaurant = () => {
    setActiveRestaurantLocation(location)
    openRestaurantModal()
  }
  return (
    <Marker
      onPress={fetchRestaurant}
      coordinate={{
        latitude: location.attributes.lat,
        longitude: location.attributes.long,
      }}
    >
      <View className="flex gap-1 items-center justify-center bg-transparent">
        <View style={styles.dot} />
        <Text>{location.attributes.restaurant.data.attributes.name}</Text>
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "red",
    width: 15,
    height: 15,
    borderRadius: 15,
  },
})
