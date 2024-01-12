import { Region } from "react-native-maps"
import { create } from "zustand"

// TODO: add isLoadingFromDB:boolean
type CurrentRegionStore = {
  region: Region | null
  changeRegion: (region:Region)=> void
}
export const useCurrentRegionStore = create<CurrentRegionStore>((set, get) => {
  
  return {
    region: null,
    changeRegion: (region) => {
      set({ region })
    },

  }
})
