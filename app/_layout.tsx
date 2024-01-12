import FontAwesome from "@expo/vector-icons/FontAwesome"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { SplashScreen, Stack, router, useRootNavigation } from "expo-router"
import { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { PaperProvider } from "react-native-paper"
import { ToastProvider } from "react-native-paper-toast"
import { initLocationsDB } from "../components/locations/locations-database"
import { useSavedLocationsStore } from "./store/recent-locations.store"
import { useUserStore } from "./store/user.store"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      // then or async await
      initLocationsDB().then(() => SplashScreen.hideAsync())
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
              <ToastProvider overrides={{ duration: 1500 }}>
                
                  <RootLayoutNav />
              </ToastProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

function RootLayoutNav() {
  const { init, isLoadingUserFromLocalStorage, user } = useUserStore()
  const { init: initSavedLocations } = useSavedLocationsStore()

  useEffect(() => {
    init()
    initSavedLocations()
  }, [])
  const [isNavigationReady, setNavigationReady] = useState(false)
  const rootNavigation = useRootNavigation()
  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setNavigationReady(true)
    })
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [rootNavigation])

  useEffect(() => {
    if (!isNavigationReady) {
      return
    }
    if (!user) {
      router.replace("/login")
    } else if (user) {
      router.replace("/")
    }
  }, [user, isNavigationReady])

  return (
    // <DrawerLayout />
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="search-modal" />
      <Stack.Screen name="restaurant-details" />
    </Stack>
  )
}
