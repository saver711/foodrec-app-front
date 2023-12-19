import EditScreenInfo from "../../components/EditScreenInfo"
import { useEffect, useState } from "react"
import { Button, StyleSheet } from "react-native"

import { Text, View } from "../../components/Themed"
import MapView, { Marker } from "react-native-maps"
import { useQuery } from "@tanstack/react-query"
import { Location } from "../../components/locations/models/locations.model"
import { StrapiWrapper } from "../api/models/strapi-wrapper"
import { request } from "../api/axios-util"

import * as ExpoLocation from "expo-location"
import { LoadingOverlay } from "../../components/shared/loading-overlay"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { RestaurantMarker } from "../../components/map/restaurant-marker"

export default function TabOneScreen() {
  // Get User LOCATION
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(
    null
  )
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null)
  useEffect(() => {
    ;(async () => {
      setIsLoadingLocation(true)
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setLocationErrorMsg("Permission to access location was denied")
        setIsLoadingLocation(false)
        return
      }

      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest
      })
      setLocation(location)
      setLocationErrorMsg(null)
      setIsLoadingLocation(false)
    })()
  }, [])

  // Get Locations
  const {
    data,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () =>
      request.get<StrapiWrapper<Location[]>>("locations", {
        params: { "populate[restaurant]": "*" }
      })
  })

  // LOADING
  if (isLoadingLocation || isLoadingLocations) {
    return <LoadingOverlay />
  }

  // ERROR - LOCATION
  if (locationErrorMsg) {
    console.log(`🚀 ~ TabTwoScreen ~ locationErrorMsg:`, locationErrorMsg)
  }
  // ERROR - LOCATIONS
  if (fetchingLocationsError) {
    console.log(
      `🚀 ~ TabTwoScreen ~ fetchingLocationsError:`,
      fetchingLocationsError
    )
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05
          }}
          style={styles.map}
        >
          {/* USER MARKER */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />

          {/* ALL LOCATIONS - FIXME: Later on it is better to load them lazily */}
          {data &&
            data.data.data.map(location => (
              <RestaurantMarker key={location.id} location={location} />
            ))}
        </MapView>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
})
