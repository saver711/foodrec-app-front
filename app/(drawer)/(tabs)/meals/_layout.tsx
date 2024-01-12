import { Stack } from "expo-router";

export default function MealsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[mealId]" />
    </Stack>
  )
}

