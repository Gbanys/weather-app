import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import WeatherDetailsSmallWeatherBox from "@/components/weatherDetailsSmallWeatherBox";
import { useWeather } from "@/context/WeatherContext";

export default function WeatherDetailsScreen() {
  const { weatherData } = useWeather();
  const { temperature, details, time, weather_code } = weatherData;
  const ContainerBackgroundImage = require('@/assets/images/weather-details.jpg');

  return (
    <View style={styles.container}>
      <ImageBackground source={ContainerBackgroundImage} style={styles.backgroundImage} resizeMode="cover">
          {temperature.map((temp: number, index: number) => (
            <WeatherDetailsSmallWeatherBox
              key={index}
              temperature={temp}
              details={details[index]}
              time={time[index]}
              weather_code={weather_code[index]}
            />
          ))}
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    width: 450,
    height: "100%"
  },
  mainText: {
    color: 'black',
  },
  nextFiveDayForecastTitleBox: {
    width: 300
  },
  nextFiveDayForcastText: {
     fontSize: 16, 
     fontWeight: "bold",
     color: "white", 
     margin: 20 
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
})