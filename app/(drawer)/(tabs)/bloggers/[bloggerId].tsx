import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Stack, useLocalSearchParams } from "expo-router"
import { Text, View } from "../../../../components/Themed"
import { BloggerMeal } from "../../../../components/meal/models/blogger-meal.model"
import { useAxios } from "../../../api/axios-util"
import { StrapiError } from "../../../api/models/strapi-error"
import { StrapiWrapper } from "../../../api/models/strapi-wrapper"

export default function BloggerDetails() {
  const { bloggerId } = useLocalSearchParams()
  const theId = +bloggerId
  const request = useAxios()

  // ONE BLOGGER's meals DETAILS
  const {
    data: bloggerMeals,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
  } = useQuery<AxiosResponse<StrapiWrapper<BloggerMeal[]>, any>, StrapiError>({
    queryKey: ["blogger-meals", theId],
    queryFn: () =>
      request.get<StrapiWrapper<BloggerMeal[]>>("meals", {
        params: {
          "populate[0]": "recommendations.blogger.image",
          "populate[1]": "images",
          sortByRecommendationsCount: "desc",
          "filters[recommendations][blogger][id][$eq]": theId,
        },
      }),
    // @ts-ignore 👁️
    select: (res) => ({
      data: {
        data: res.data.data.map((meal) => ({
          ...meal,
          attributes: {
            ...meal.attributes,
            recommendations: {
              data: meal.attributes.recommendations.data.filter((rec) => {
                return rec.attributes.blogger.data.id === theId
              }),
            },
          },
        })),
      },
    }),
  })
  const meals = bloggerMeals as AxiosResponse<StrapiWrapper<BloggerMeal[]>>

  const bloggerData =
    meals?.data.data[0].attributes.recommendations.data[0].attributes.blogger

  return (
    <>
      {bloggerData && (
        <Stack.Screen
          options={{
            title: bloggerData.data.attributes.name,
          }}
        />
      )}

      {meals &&
        meals.data.data.map((meal) => (
          <View key={meal.id}>
            <Text>Meal: {meal.attributes.name}</Text>
            <Text>rec: {meal.attributes.recommendations.data.length}</Text>
          </View>
        ))}
    </>
  )
}
