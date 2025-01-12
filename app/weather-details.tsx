import React from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView} from "react-native";
import WeatherDetailsSmallWeatherBox from "@/components/weatherDetailsSmallWeatherBox";
import { useWeather } from "@/context/WeatherContext";

export default function WeatherDetailsScreen() {
  const { weatherData } = useWeather();
  const { temperature, details, time, weather_code, date, location } = weatherData;
  const ContainerBackgroundImage = require('@/assets/images/weather-details.jpg');

  return (
      <View style={styles.container}>
        <ImageBackground source={ContainerBackgroundImage} style={styles.backgroundImage} resizeMode="cover">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Hourly weather forecast in {location}</Text>
              <Text style={styles.titleText}>{date}:</Text>
            </View>
            {temperature.map((temp: number, index: number) => (
              <WeatherDetailsSmallWeatherBox
                key={index}
                temperature={temp}
                details={details[index]}
                time={time[index]}
                weather_code={weather_code[index]}
              />
            ))}
            </ScrollView>
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
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center"
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
  titleContainer: {
    margin: 20,
    alignItems: "center"
  },
  titleText: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
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