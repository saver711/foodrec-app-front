import { useEffect } from "react"
import { StyleSheet } from "react-native"

import { Text, View } from "../../components/Themed"
import MapView from "react-native-maps"
import { useQuery } from "@tanstack/react-query"
import { Restaurant } from "../../components/restaurants/models/restaurants.model"
import axios from "axios"
import { StrapiWrapper } from "../api/models/strapi-wrapper"

export default function TabTwoScreen() {
  const { data, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () =>
      axios.get<StrapiWrapper<Restaurant[]>>(
        "http://10.0.2.2:1337/api/restaurants",
        {
          params: { populate: "*" },
        }
      ),
  });

  useEffect(() => {
    console.log(data?.data);
    console.log("error", error); 
  }, [data, error]);
  return (
    <View style={styles.container}>
      <Text>12</Text>
      {data && <Text>{data.data.data[0].id}</Text>}
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
