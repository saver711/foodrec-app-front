import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, useColorScheme } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DrawerToggleButton } from "@react-navigation/drawer"
import { CommonActions } from "@react-navigation/native"
import { Tabs } from "expo-router"
import { BottomNavigation, Portal } from "react-native-paper"
import { View } from "../../../components/Themed"

const Tab = createBottomTabNavigator()
export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Portal.Host>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <View className="flex-row flex items-center bg-black">
            <BottomNavigation.Bar
              style={styles.bot}
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                })

                if (event.defaultPrevented) {
                  preventDefault()
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  })
                }
              }}
              renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key]
                if (options.tabBarIcon) {
                  return options.tabBarIcon({ focused, color, size: 24 })
                }

                return null
              }}
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key]
                const label =
                  options.tabBarLabel !== undefined
                    ? (options.tabBarLabel as string)
                    : options.title !== undefined
                    ? options.title
                    : route.name

                return label
              }}
            />
            <DrawerToggleButton tintColor="white" />
          </View>
        )}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
            // headerRight: () => (
            //   <Link href="/modal" asChild>
            //     <Pressable>
            //       {({ pressed }) => (
            //         <FontAwesome
            //           name="info-circle"
            //           size={25}
            //           color={Colors[colorScheme ?? "light"].text}
            //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            //         />
            //       )}
            //     </Pressable>
            //   </Link>
            // )
          }}
        />
        <Tabs.Screen
          name="meals"
          options={{
            title: "Meals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="code" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="bloggers"
          options={{
            title: "Bloggers",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="code" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  bot: {
    flex: 1,
  },
})
