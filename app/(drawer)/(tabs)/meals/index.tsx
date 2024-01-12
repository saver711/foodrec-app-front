import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Link } from "expo-router"
import { Button, Linking, StyleSheet } from "react-native"
import { Meal } from "../../../../components/meal/models/meal.model"
import { useAxios } from "../../../api/axios-util"
import { StrapiError } from "../../../api/models/strapi-error"
import { StrapiWrapper } from "../../../api/models/strapi-wrapper"

export default function BloggersScreen() {
  const request = useAxios()
  const openYoutube = () =>
    Linking.openURL("vnd.youtube://watch?v=3XSYpFGpY1U")
  const openFace = () =>
    Linking.openURL("https://web.facebook.com/ONtv/videos/1414899762764957")

  const {
    data: mealsData,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
  } = useQuery<AxiosResponse<StrapiWrapper<Meal[]>, any>, StrapiError>({
    queryKey: ["meals"],
    queryFn: () =>
      request.get<StrapiWrapper<Meal[]>>("meals", {
        params: {
          "populate[0]": "recommendations.blogger.image",
          "populate[1]": "images",
          sortByRecommendationsCount: "desc",
        },
      }),
  })

  return (
    <>
      <Button title="openYoutube" onPress={openYoutube} />
      <Button title="openYoutube" onPress={openYoutube} />
      <Button title="openFace" onPress={openFace} />
      <Button title="openFace" onPress={openFace} />

      {mealsData &&
        mealsData.data.data.map((meal) => (
          <Link key={meal.id} className="text-white" href={`/meals/${meal.id}`}>
            {meal.attributes.name}
          </Link>
        ))}
    </>
  )
}

const styles = StyleSheet.create({})
