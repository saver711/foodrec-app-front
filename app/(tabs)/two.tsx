import { useEffect } from "react"
import { StyleSheet } from "react-native"

import { Text, View } from "../../components/Themed"
import MapView from "react-native-maps"
import { useQuery } from "@tanstack/react-query"
import { request } from "../api/axios-util"
import { Restaurant } from "../../components/restaurants/models/restaurants.model"

export default function TabTwoScreen() {
  const { data, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () =>
      request.get<Restaurant[]>("restaurants", { params: { populate: "*" } }),
  })

  useEffect(() => {
    console.log(data)
    console.log("error", error)
  }, [data, error])

  return (
    <View style={styles.container}>
      <Text>12</Text>
      {data && <Text>{data.data[0].id}</Text>}

      <MapView style={styles.map} />
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
})
