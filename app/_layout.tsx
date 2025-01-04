import { Stack } from "expo-router";
import { WeatherProvider } from "@/context/WeatherContext";
import React from "react";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherProvider>
  );
}
