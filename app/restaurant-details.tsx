import { router, useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet } from "react-native"
import { View } from "../components/Themed"
import { RestaurantDetails } from "../components/restaurants/restaurant-details"

export default function RestaurantDetailsScreen() {
  const params = useLocalSearchParams()
  const restaurantID = params["restaurantID"] as unknown as number | undefined
  // const navigation = router
  const goBack = router.back
  if (!restaurantID) {
    // error
  }

  return (
    <>
      {restaurantID && (
        <View style={styles.container}>
          
          <RestaurantDetails restaurantID={restaurantID} />
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          {/* <Button  title="goback" onPress={goBack} /> */}
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
