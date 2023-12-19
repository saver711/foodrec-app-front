import {
  BottomSheetModal,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet"
import { Text, View } from "../../components/Themed"
import { Button, StyleSheet } from "react-native"
import { useCallback, useMemo, useRef } from "react"
export default function TabTwoScreen() {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ["92%", "40%"], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button onPress={() => console.log("ssss")} title="log" color="black" />
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  }
})
