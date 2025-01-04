import { StyleSheet, Text, View } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";

const PlaceholderWeatherIcon = require('@/assets/images/sun.png');

type SmallWeatherBoxProps = {
  details: string;
  temperature: number;
  time: string;
};

type WeatherIconProps = {
  imgSource: ImageSource;
};

export default function WeatherDetailsSmallWeatherBox({ details, temperature, time }: SmallWeatherBoxProps) {
  return (
    <View style={styles.container}>
      <WeatherIcon imgSource={PlaceholderWeatherIcon} />
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
    justifyContent: "center",
  },
  timeContainer: {
    flex: 1,
    width: "65%",
    alignItems: "flex-end"
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
