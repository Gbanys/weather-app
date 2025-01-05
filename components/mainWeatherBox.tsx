import { StyleSheet, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";
import { useLocation } from "@/context/LocationContext";

type mainWeatherBoxProps = {
  boxBackground: ImageSource;
  weatherIcon: ImageSource;
  text: string;
  temperature: number;
};

type weatherIconProps = {
  imgSource: ImageSource;
}

export default function MainWeatherBox({ boxBackground, weatherIcon, text, temperature }: mainWeatherBoxProps) {
  const temperatureString = `${temperature}°C`;
  const { locationData } = useLocation();
  const city = locationData?.city ?? "Unknown";

  return (
    <View style={styles.container}>
      <Image source={boxBackground} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{city}</Text>
        <Text style={styles.text}>{text}</Text>
        <WeatherIcon imgSource={weatherIcon} />
        <Text style={styles.temperature}>{temperatureString}</Text>
      </View>
    </View>
  );
}

function WeatherIcon({ imgSource }: weatherIconProps) {
    return (
      <View style={styles.topWeatherIcon}>
        <Image source={imgSource} style={styles.image} />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 350,
    borderRadius: 18,
    marginTop: 20,
    overflow: "hidden", // Ensures the text doesn't overflow the rounded corners
  },
  topWeatherIcon: {
    width: 100,
    height: 100,
    margin: 20
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute", // Position the image to be the background
  },
  textContainer: {
    flex: 1,
    alignItems: "center", // Center the text horizontally
    margin: 20
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Optional: Add a shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    margin: 5
  },
  temperature: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.85)", // Optional: Add a shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  }
});
