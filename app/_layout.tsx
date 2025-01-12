import { Stack } from "expo-router";
import { WeatherProvider } from "@/context/WeatherContext";
import React, { useEffect, useState } from "react";
import { LocationProvider } from "@/context/LocationContext";
import { ConversationProvider } from "@/context/ConversationContext";
import { useLocation } from "@/context/LocationContext";
import { View, Text } from "react-native";
import axios from "axios";
import * as Location from 'expo-location';

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
    const fetchLocationData = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission denied");
          setLocationLoaded(true);
          return;
        }

        // Get current location
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = position.coords;

        // Fetch city data using the latitude and longitude
        const response = await axios.get(
          `http://192.168.0.33:8000/city?latitude=${latitude}&longitude=${longitude}`
        );

        const city = response.data;

        setLocationData({ latitude, longitude, city });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, City: ${city}`);
      } catch (error) {
        console.error("Error fetching location or city data:", error);
      } finally {
        setLocationLoaded(true);
      }
    };

    fetchLocationData(); // Call the function to fetch location data
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
