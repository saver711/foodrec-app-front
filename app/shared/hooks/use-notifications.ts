import { isDevice } from "expo-device"
import {
  Notification,
  ExpoPushToken,
  setNotificationHandler,
  Subscription,
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
} from "expo-notifications"
import * as Constants from "expo-constants"
import { useEffect, useRef, useState } from "react"

import { Platform } from "react-native"
export type PushNotificationState = {
  expoPushToken?: ExpoPushToken
  notification?: Notification
}
export const usePushNotifications = (): PushNotificationState => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  })

  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>()
  const [notification, setNotification] = useState<Notification>()

  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  async function registerForPushNotificationsAsync() {
    let token

    if (isDevice) {
      const { status: existingStatus } = await getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== "granted") {
        const { status } = await requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push notifications token")
        return
      }

      token = await getExpoPushTokenAsync({
        projectId: Constants.default.easConfig?.projectId,
      })
    } else {
      alert("Must be using a physical device")
    }

    if (Platform.OS === "android") {
      setNotificationChannelAsync("default", {
        name: "default",
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      })
    }
    if (Platform.OS === "ios") {
    }

    return token
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token)
    })

    notificationListener.current = addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      }
    )

    responseListener.current = addNotificationResponseReceivedListener(
      (response) => {
        console.log("notification response", response)
      }
    )

    return () => {
      removeNotificationSubscription(notificationListener.current!)
      removeNotificationSubscription(responseListener.current!)
    }
  }, [])

  return { notification, expoPushToken }
}
