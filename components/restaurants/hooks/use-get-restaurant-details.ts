import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../../../app/api/axios-util"
import { StrapiWrapper } from "../../../app/api/models/strapi-wrapper"
import { Restaurant } from "../models/restaurants.model"

type UseGetRestaurantDetailsProps = {
  id: number | undefined
  enabled?: boolean
}

export const useGetRestaurantDetails = ({
  enabled = true,
  id,
}: UseGetRestaurantDetailsProps) => {
  const queryClient = useQueryClient()
  const theRestaurant: Restaurant | undefined = queryClient.getQueryData(["restaurants", id])
  const request = useAxios()

  const isEnabled = enabled && !theRestaurant

  const query = useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => request.get<StrapiWrapper<Restaurant>>(`restaurants/${id}`),
    enabled: isEnabled,
  })

  return query
}
