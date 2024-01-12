import { create } from "zustand"
import {
  fetchLocations,
  insertLocation,
  removeLocation,
} from "../../components/locations/locations-database"
import { SavedLocation } from "../../components/locations/models/locations.model"

// TODO: add isLoadingFromDB:boolean
type RecentLocationsStore = {
  locations: SavedLocation[]
  init: () => void
  addLocation: (locations: SavedLocation) => void
  removeLocation: (locationId: number) => void
}
export const useSavedLocationsStore = create<RecentLocationsStore>(
  (set, get) => {
    return {
      locations: [],
      init: async () => {
        const locations = (await fetchLocations()) as SavedLocation[]
        set({ locations })
      },
      addLocation: async (newLocation) => {
        const locations = get().locations
        const locationExists = locations.some(
          (location) => location.locationId === newLocation.locationId
        )
        if (!locationExists) {
          locations.push(newLocation)
          set({ locations })
          await insertLocation(newLocation)
        }
      },
      removeLocation: async (locationId) => {
        const locations = get().locations.filter(
          (location) => location.id !== locationId
        )
        set({ locations })
        await removeLocation(locationId)
      },
    }
  }
)
