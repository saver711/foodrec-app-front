import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Stack, useLocalSearchParams } from "expo-router"
import { Text } from "../../../../components/Themed"
import { Meal } from "../../../../components/meal/models/meal.model"
import { useAxios } from "../../../api/axios-util"
import { StrapiError } from "../../../api/models/strapi-error"
import { StrapiWrapper } from "../../../api/models/strapi-wrapper"

export default function MealDetails() {
  const { mealId } = useLocalSearchParams()
  const theId = +mealId
  const request = useAxios()

  // ONE MEAL's meals DETAILS
  const {
    data: mealData,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
  } = useQuery<AxiosResponse<StrapiWrapper<Meal>, any>, StrapiError>({
    queryKey: ["meals", theId],
    queryFn: () =>
      request.get<StrapiWrapper<Meal>>(`meals/${theId}`, {
        params: {
          "populate[0]": "recommendations.blogger.image",
          "populate[1]": "images",
        },
      }),
  })

  return (
    <>
      {mealData && (
        <Stack.Screen
          options={{
            title: mealData.data.data.attributes.name,
          }}
        />
      )}

      {mealData && <Text className="text-white">{mealData.data.data.attributes.name}</Text>}
    </>
  )
}
