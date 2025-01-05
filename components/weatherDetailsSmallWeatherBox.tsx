import { StyleSheet, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";
import weatherCodesToImages from "@/assets/weather_images";

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
  const weatherIcon = weatherCodesToImages[Number(weather_code)];

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
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center",  // Align the time vertically centered
  },
  dayText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 25
  },
  tempText: {
    fontSize: 14,
    color: "#666",
  },
});
