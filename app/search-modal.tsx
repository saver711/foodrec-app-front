import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigation } from "expo-router"
import { useState } from "react"
import { Dimensions, FlatList, Image } from "react-native"
import { Region } from "react-native-maps"
import { Button, Searchbar } from "react-native-paper"
import { Text, View } from "../components/Themed"
import {
  Location,
  SavedLocation,
} from "../components/locations/models/locations.model"
import { baseURL, useAxios } from "./api/axios-util"
import { StrapiError } from "./api/models/strapi-error"
import { StrapiWrapper } from "./api/models/strapi-wrapper"
import { useCurrentRegionStore } from "./store/current-region.store"
import { useSavedLocationsStore } from "./store/recent-locations.store"

export default function ModalScreen() {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const {
    locations: savedLocations,
    removeLocation,
    addLocation,
  } = useSavedLocationsStore()
  const { changeRegion } = useCurrentRegionStore()
  const onChangeSearch = (query: string) => {
    setSearchQuery(query)
  }

  const request = useAxios()

  const {
    data: locationsData,
    error: fetchingLocationsError,
    isLoading: isLoadingLocations,
    refetch: search,
  } = useQuery<AxiosResponse<StrapiWrapper<Location[]>, any>, StrapiError>({
    queryKey: ["locations", "search"],
    queryFn: () =>
      request.get<StrapiWrapper<Location[]>>("locations", {
        params: {
          "filters[name][$contains]": searchQuery,
          populate: "restaurant.logo",
        },
      }),
    enabled: false,
  })

  const renderSavedLocationLink = (location: SavedLocation) => {
    const region: Region = {
      latitude: location.lat,
      longitude: location.long,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    }

    const navigate = () => {
      changeRegion(region)
      navigation.goBack()
    }
    return (
      <View className="text-white">
        <Button onPress={navigate}>{location.name}</Button>
        <Button onPress={() => removeLocation(location.id)}>X</Button>
      </View>
    )
  }
  const renderLocationLink = (location: Location) => {
    const region: Region = {
      latitude: location.attributes.lat,
      longitude: location.attributes.long,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    }

    const navigate = () => {
      changeRegion(region)
      navigation.goBack()
      const toBeSavedLocation: SavedLocation = {
        id: location.id,
        address: location.attributes.address,
        lat: location.attributes.lat,
        long: location.attributes.long,
        name: location.attributes.name,
      }
      addLocation(toBeSavedLocation)
    }
    return (
      <View className="text-white">
        <Button onPress={navigate}>
          {baseURL && (
            <Image
              source={{
                uri:
                  baseURL.slice(0, -5) +
                  location.attributes.restaurant.data?.attributes.logo.data
                    ?.attributes.formats.thumbnail.url,
                width: 70,
                height: 50,
              }}
            />
          )}
          {location.attributes.name}
        </Button>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <Searchbar
        style={{ width: Dimensions.get("window").width - 10 }}
        className=" bg-white border-black border-2"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={() => search()}
      />

      {!locationsData && (
        <>
          <Text>Recent:</Text>
          <FlatList
            data={savedLocations}
            renderItem={(location) => renderSavedLocationLink(location.item)}
            keyExtractor={(location) => location.id.toString()}
          />
        </>
      )}

      {locationsData && (
        <>
          <Text>Search Results:</Text>
          <FlatList
            data={locationsData.data.data}
            renderItem={(location) => renderLocationLink(location.item)}
            keyExtractor={(location) => location.id.toString()}
          />
        </>
      )}
    </View>
  )
}
