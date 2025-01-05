import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useWeather } from "@/context/WeatherContext";
import MainWeatherBox from "@/components/mainWeatherBox";
import SmallWeatherBox from "@/components/smallWeatherBox";
import weatherCodesToImages from "@/assets/weather_images";
import { format } from 'date-fns';


const PlaceholderWeatherImage = require('@/assets/images/sunny.jpg');
const ContainerBackgroundImage = require('@/assets/images/bubble_background.jpg');

type WeatherData = {
  date: string[];
  minimum_temperature: number[];
  maximum_temperature: number[];
  average_temperature: number[];
  description: string[];
  current_weather_description: string;
  current_date: string;
  current_temperature: number;
  current_weather_code: number;
  weather_code: string[];
};

type Data = {
  temperature: string[];
  time: string[];
  description: string[];
  weather_code: string[];
}

type UnaggregatedWeatherData = {
  [key: string]: Data
};

export default function Index() {
  const { setWeatherData } = useWeather();
  const router = useRouter();

  const [aggregatedWeatherData, setAggregatedWeatherData] = useState<WeatherData | null>(null);
  const [unaggregatedWeatherDataByDate, setUnaggregatedWeatherDataByDate] = useState<UnaggregatedWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      const latitude = 50.9;
      const longitude = -1.4;

      try {
        const first_response = await fetch(`http://127.0.0.1:8000/get_aggregated_weather_data?latitude=${latitude}&longitude=${longitude}`);
        const second_response = await fetch(`http://127.0.0.1:8000/get_grouped_weather_data_by_date?latitude=${latitude}&longitude=${longitude}`);
        if (!first_response.ok || !second_response.ok) {
          throw new Error("Failed to fetch data");
        }
        const aggregated_weather_data = await first_response.json();
        setAggregatedWeatherData(aggregated_weather_data);

        const unaggregated_weather_data = await second_response.json();
        setUnaggregatedWeatherDataByDate(unaggregated_weather_data);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, []); // Empty dependency array ensures this runs once on mount.

  const handleWeatherBoxClick = (temperature: string[], details: string[], time: string[], weather_code: string[]) => {
    setWeatherData({ temperature, details, time, weather_code });
    router.push("/weather-details");
  };

  const current_date = aggregatedWeatherData?.['current_date'] ?? ''

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE do 'of' MMMM");
  };

  return (
    <View style={ styles.container }>
      <ImageBackground source={ContainerBackgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity key='today' onPress={() => handleWeatherBoxClick(
            unaggregatedWeatherDataByDate?.[current_date]?.['temperature'] ?? [], 
            unaggregatedWeatherDataByDate?.[current_date]?.['description'] ?? [], 
            unaggregatedWeatherDataByDate?.[current_date]?.['time'] ?? [],
            unaggregatedWeatherDataByDate?.[current_date]?.['weather_code'] ?? []
            )}>
            <MainWeatherBox 
              boxBackground={PlaceholderWeatherImage}
              weatherIcon={weatherCodesToImages[Number(aggregatedWeatherData?.['current_weather_code'])]}
              text={aggregatedWeatherData?.['current_weather_description'] ?? ''} 
              temperature={aggregatedWeatherData?.['current_temperature'] ?? 0}
            />
          </TouchableOpacity>
          <View style={styles.nextFiveDayForecastTitleBox}>
            <Text style={styles.nextFiveDayForcastText}>Next 6 days: </Text>
          </View>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading weather data...</Text>
          ) : (
            aggregatedWeatherData &&
            aggregatedWeatherData['date'].map((date: string, index: number) => (
              date !== current_date && (
              <TouchableOpacity key={`${date}-${index}`} onPress={() => handleWeatherBoxClick(
                unaggregatedWeatherDataByDate?.[date]?.['temperature'] ?? [], 
                unaggregatedWeatherDataByDate?.[date]?.['description'] ?? [], 
                unaggregatedWeatherDataByDate?.[date]?.['time'] ?? [],
                unaggregatedWeatherDataByDate?.[date]?.['weather_code'] ?? []
                )}>
                <SmallWeatherBox
                  imgSource={weatherCodesToImages[Number(aggregatedWeatherData?.['weather_code'][index])]}
                  text={aggregatedWeatherData['description'][index]}
                  temperature={aggregatedWeatherData['average_temperature'][index]}
                  date={formatDate(date)}
                />
              </TouchableOpacity>
            )))
          )}
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
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "white",
  },
})