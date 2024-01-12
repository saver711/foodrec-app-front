import { FontAwesome } from "@expo/vector-icons"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import * as ExpoLocation from "expo-location"
import { Link } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import MapView, { Region } from "react-native-maps"
import { Portal } from "react-native-paper"
import { Text, View } from "../../../components/Themed"
import { Location } from "../../../components/locations/models/locations.model"
import { RestaurantMarker } from "../../../components/map/restaurant-marker"
import { MapSearch } from "../../../components/map/search-restaurants/map-search"
import { RestaurantDetails } from "../../../components/restaurants/restaurant-details"
import { useAxios } from "../../api/axios-util"
import { StrapiError } from "../../api/models/strapi-error"
import { StrapiWrapper } from "../../api/models/strapi-wrapper"
import { usePushNotifications } from "../../shared/hooks/use-notifications"
import { useCurrentRegionStore } from "../../store/current-region.store"
const snapPoints = ["45%", "100%"]
export default function HomeScreen() {
  const { expoPushToken, notification } = usePushNotifications()
  console.log(`HomeScreen ~ expoPushToken:`, expoPushToken)
  const mapRef = useRef<MapView>()

  const request = useAxios()
  // Get User LOCATION
  const { region, changeRegion } = useCurrentRegionStore()
  const [userLocation, setUserLocation] =
    useState<ExpoLocation.LocationObject | null>(null)
  const [isLoadingUserLocation, setIsLoadingUserLocation] = useState(false)
  const [userLocationErrorMsg, setUserLocationErrorMsg] = useState<
    string | null
  >(null)
  useEffect(() => {
    ;(async () => {
      setIsLoadingUserLocation(true)
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setUserLocationErrorMsg("Permission to access location was denied")
        setIsLoadingUserLocation(false)
        return
      }

      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest,
      })
      setUserLocation(location)
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }
      changeRegion(region)
      setUserLocationErrorMsg(null)
      setIsLoadingUserLocation(false)
    })()
  }, [])

  // Get Locations
  const {
    data: locations,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
  } = useQuery<AxiosResponse<StrapiWrapper<Location[]>, any>, StrapiError>({
    queryKey: ["locations"],
    queryFn: () =>
      request.get<StrapiWrapper<Location[]>>("locations", {
        params: { populate: "restaurant" },
      }),
  })

  // ACTIVE RESTAURANT LOCATION
  const [activeRestaurantLocation, setActiveRestaurantLocation] =
    useState<Location | null>(null)

  const activeRestaurantId =
    activeRestaurantLocation?.attributes.restaurant.data?.id

  // BOTTOM SHEET
  const sheetRef = useRef<BottomSheetModal>(null)

  const [isSheetIndicatorHidden, setIsSheetIndicatorHidden] = useState(false)
  const openRestaurantModal = () => {
    sheetRef.current?.present()
  }
  const closeModal = () => {
    sheetRef.current?.collapse()
  }

  // bottom sheet
  const handleSheetChange = (index: number) => {
    if (index === 1) {
      setIsSheetIndicatorHidden(true)
    } else {
      setIsSheetIndicatorHidden(false)
    }
  }

  // onRegionChange
  const onRegionChange = (region: Region) => {
    changeRegion(region)
  }

  // ERROR - USER LOCATION
  if (userLocationErrorMsg) {
    console.log(`🚀 ~ TabTwoScreen ~ locationErrorMsg:`, userLocationErrorMsg)
  }

  // LOADING
  // if (isLoadingUserLocation || isLoadingLocations) {
  //   return <LoadingOverlay />
  // }

  // ERROR - LOCATIONS
  if (fetchingLocationsError) {
    console.log(`tionsError:`, fetchingLocationsError)
  }

  return (
    <View style={styles.container}>
      <Text>TOKEN</Text>
      <Text>TOKEN</Text>
      <Text>TOKEN</Text>
      <TextInput value={expoPushToken?.data} />
      {userLocation && region && (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <MapView
              showsUserLocation={true}
              showsMyLocationButton={true}
              // scrollEnabled={false} // needed so that onPanDrag work on  IOS
              // onPanDrag={}
              // onUserLocationChange={}
              onRegionChangeComplete={onRegionChange}
              initialRegion={region}
              region={region}
              style={styles.map}
            >
              {/* SEARCH BAR */}

              {/* USER LOCATION MARKER */}
              {/* <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
              /> */}

              {/* ALL LOCATIONS - FIXME: Later on it is better to load them lazily */}
              {locations &&
                locations.data.data.map((location) => (
                  <RestaurantMarker
                    key={location.id}
                    openRestaurantModal={openRestaurantModal}
                    setActiveRestaurantLocation={setActiveRestaurantLocation}
                    location={location}
                  />
                ))}
            </MapView>
            <MapSearch />
          </View>
        </>
      )}
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            {...(isSheetIndicatorHidden && {
              handleIndicatorStyle: styles.headerIndicator,
            })}
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >
              {isSheetIndicatorHidden && activeRestaurantId && (
                <View className="flex-row justify-between items-center">
                  <FontAwesome
                    onPress={closeModal}
                    size={28}
                    name="chevron-down"
                  />
                  <Link
                    href={{
                      pathname: "/restaurant-details",
                      params: { restaurantID: activeRestaurantId },
                    }}
                  >
                    <FontAwesome size={28} name="arrow-right" />
                  </Link>
                </View>
              )}

              {activeRestaurantId && (
                <RestaurantDetails restaurantID={activeRestaurantId} />
              )}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 15,
    paddingTop: 20,
  },
  headerIndicator: {
    height: 0,
  },
})
