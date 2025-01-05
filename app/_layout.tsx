import { Stack } from "expo-router";
import { WeatherProvider } from "@/context/WeatherContext";
import React, { useEffect, useState } from "react";
import { LocationProvider } from "@/context/LocationContext";
import { ConversationProvider } from "@/context/ConversationContext";
import { useLocation } from "@/context/LocationContext";
import { View, Text } from "react-native";
import axios from "axios";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <ConversationProvider>
        <LocationProvider>
          <LocationWrapper />
        </LocationProvider>
      </ConversationProvider>
    </WeatherProvider>
  );
}


const LocationWrapper = () => {
  const { setLocationData } = useLocation();
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    const fetchLocationData = async (position: GeolocationPosition) => {
      try {
        const { latitude, longitude } = position.coords;

        const response = await axios.get(
          `http://127.0.0.1:8000/city?latitude=${latitude}&longitude=${longitude}`
        );

        const city = response.data;

        setLocationData({ latitude, longitude, city });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, City: ${city}`);
      } catch (error) {
        console.error("Error fetching city data:", error);
      } finally {
        setLocationLoaded(true);
      }
    };

    // Get the current location
    navigator.geolocation.getCurrentPosition(
      (position) => fetchLocationData(position),
      (error) => {
        console.error("Error getting location:", error.message);
        setLocationLoaded(true);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );
  }, [setLocationData]);

  if (!locationLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};


const LoadingScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};
