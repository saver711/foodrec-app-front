import { Stack } from "expo-router"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { Text } from "../Themed"
import { LoadingOverlay } from "../shared/loading-overlay"
import { useGetRestaurantDetails } from "./hooks/use-get-restaurant-details"

type RestaurantDetailsProps = {
  restaurantID: number
}
export const RestaurantDetails = ({ restaurantID }: RestaurantDetailsProps) => {
  const {
    refetch,
    data: activeRestaurantData,
    isFetching,
  } = useGetRestaurantDetails({
    id: restaurantID,
  })

  const restaurantData = {
    id: activeRestaurantData?.data.data.id,
    ...activeRestaurantData?.data.data.attributes,
  }

  // LOADING
  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <>
      {restaurantData && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
        >
          {/* THIS WILL CHANGE MODAL HEADER */}
          <Stack.Screen
            options={{
              title: restaurantData.name,
            }}
          />
          <Text className="text-black">{restaurantData.name}</Text>
        </ScrollView>
      )}
    </>
  )
}
