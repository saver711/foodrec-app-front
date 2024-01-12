import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Link } from "expo-router"
import { Button, Linking, StyleSheet } from "react-native"
import { Blogger } from "../../../../components/blogger/models/blogger.model"
import { useAxios } from "../../../api/axios-util"
import { StrapiError } from "../../../api/models/strapi-error"
import { StrapiWrapper } from "../../../api/models/strapi-wrapper"

export default function BloggersScreen() {
  const request = useAxios()
  const openYoutube = () =>
    Linking.openURL("vnd.youtube://watch?v=Puy-SOeFVkE&")
  const openFace = () =>
    Linking.openURL("https://web.facebook.com/ONtv/videos/1414899762764957")

  const {
    data: bloggersData,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
  } = useQuery<AxiosResponse<StrapiWrapper<Blogger[]>, any>, StrapiError>({
    queryKey: ["bloggers"],
    queryFn: () =>
      request.get<StrapiWrapper<Blogger[]>>("bloggers", {
        params: {
          "populate[0]": "recommendations",
          "populate[1]": "image",
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

      {bloggersData &&
        bloggersData.data.data.map((blogger) => (
          <Link key={blogger.id} className="text-white" href={`/bloggers/${blogger.id}`}>
            {blogger.attributes.name}
          </Link>
        ))}
    </>
  )
}

const styles = StyleSheet.create({})
