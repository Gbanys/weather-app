import React from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useWeather } from "@/context/WeatherContext";
import MainWeatherBox from "@/components/mainWeatherBox";
import SmallWeatherBox from "@/components/smallWeatherBox";

const PlaceholderWeatherImage = require('@/assets/images/sunny.jpg');
const ContainerBackgroundImage = require('@/assets/images/bubble_background.jpg');
const temperature = 1;
const date = "Monday 5th of January";

const temperatures = [1, 2, 3, -2]
const details=["Sunny", "Sunny", "Cloudy", "Rainy"]
const time=["00:00", "01:00", "02:00", "03:00"]

export default function Index() {
  const { setWeatherData } = useWeather();
  const router = useRouter();

  const handleWeatherBoxClick = () => {
    setWeatherData({ temperature: temperatures, details, time });
    router.push("/weather-details");
  };

  return (
    <View style={ styles.container }>
      <ImageBackground source={ContainerBackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={handleWeatherBoxClick}>
            <MainWeatherBox imgSource={PlaceholderWeatherImage} text="Sunny" temperature={temperature}/>
          </TouchableOpacity>
          <View style={styles.nextFiveDayForecastTitleBox}>
            <Text style={styles.nextFiveDayForcastText}>Next 5 days: </Text>
          </View>
          <SmallWeatherBox imgSource={PlaceholderWeatherImage} text="Sunny" temperature={temperature} date={date} />
          <SmallWeatherBox imgSource={PlaceholderWeatherImage} text="Sunny" temperature={temperature} date={date} />
          <SmallWeatherBox imgSource={PlaceholderWeatherImage} text="Sunny" temperature={temperature} date={date} />
          <SmallWeatherBox imgSource={PlaceholderWeatherImage} text="Sunny" temperature={temperature} date={date} />
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
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