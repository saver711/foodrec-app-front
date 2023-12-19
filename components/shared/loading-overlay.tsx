import { FontAwesome } from "@expo/vector-icons"
import { Text, View } from "../Themed"
import { StyleSheet } from "react-native"
type LoadingOverlayProps = {
  text?: string
}
export const LoadingOverlay = ({
  text = "Loading..."
}: LoadingOverlayProps) => {
  return (
    <View style={styles.view}>
      <FontAwesome name="spinner" size={38} />
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4
  },
  text: {}
})
