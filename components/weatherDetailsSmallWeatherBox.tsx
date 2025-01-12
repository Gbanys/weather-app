import { StyleSheet, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";
import weatherCodesToImagesDay from "@/assets/weather_images_day";
import weatherCodesToImagesNight from "@/assets/weather_images_night";

type SmallWeatherBoxProps = {
  details: string;
  temperature: number;
  time: string;
  weather_code: number;
};

type WeatherIconProps = {
  imgSource: ImageSource;
};

export default function WeatherDetailsSmallWeatherBox({ details, temperature, time, weather_code }: SmallWeatherBoxProps) {
  const hour = parseInt(time.split(':')[0], 10); // Get the hour (HH) from time

  const weatherIcon =
    hour >= 7 && hour < 18
      ? weatherCodesToImagesDay[Number(weather_code)] // Daytime icon
      : weatherCodesToImagesNight[Number(weather_code)]; // Nighttime icon

  return (
    <View style={styles.container}>
      <WeatherIcon imgSource={weatherIcon} />
      <View style={styles.textContainer}>
        <Text>{details}</Text>
        <Text style={styles.tempText}>{temperature}°C</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.dayText}>{time}</Text>
      </View>
    </View>
  );
}

function WeatherIcon({ imgSource }: WeatherIconProps) {
  return (
    <View>
      <Image source={imgSource} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: "row", // Layout children side by side
    alignItems: "center", // Center items vertically
    padding: 10,
    margin: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, 
    justifyContent: "center",
  },
  timeContainer: {
    width: "30%",
    alignItems: "flex-end",
    justifyContent: "center",  // Align the time vertically centered
  },
  dayText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 20
  },
  tempText: {
    fontSize: 14,
    color: "#666",
  },
});
