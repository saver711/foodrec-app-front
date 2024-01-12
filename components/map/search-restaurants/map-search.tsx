import { Link } from "expo-router"
import { Dimensions } from "react-native"
import { Searchbar } from "react-native-paper"
import {MutableRefObject} from 'react'
import MapView from "react-native-maps"

export const MapSearch = () => {
  return (
    <>
      <Link
        className="absolute z-10 top-10 left-2 bg-transparent"
        style={{ width: Dimensions.get("window").width - 10 }}
        href={{
          pathname: "/search-modal",
        }}
      >
        <Searchbar placeholder="Search" value="" />
      </Link>
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "transparent",
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   contentContainer: {
//     backgroundColor: "white",
//     padding: 15,
//     paddingTop: 20,
//   },
//   headerIndicator: {
//     height: 0,
//   },
// })
