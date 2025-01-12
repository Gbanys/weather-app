import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useLocation } from "@/context/LocationContext";
import { router } from "expo-router";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { locationData, setLocationData } = useLocation();
  console.log(locationData);

  const fetchSuggestions = async (query: React.SetStateAction<string>) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://192.168.0.33:8000/suggestions?query=${query}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleTextChange = (text: React.SetStateAction<string>) => {
    setSearchQuery(text);
    fetchSuggestions(text);
  };

  const handleSuggestionPress = async (suggestion: string) => {
    if (!locationData?.latitude || !locationData?.longitude) {
      console.error("Latitude or Longitude is missing in locationData.");
      return;
    }
    try {
      const response = await axios.get(`http://192.168.0.33:8000/coordinates?city=${suggestion}`);
      setSearchQuery(suggestion);
      setSuggestions([]);
      setLocationData({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        city: suggestion,
      });
      router.push('/'); 
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search weather data by location:</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Enter location"
        value={searchQuery}
        onChangeText={handleTextChange}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
            <Text style={styles.suggestionItem}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'black',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    alignSelf: 'center',
  },
  suggestionsList: {
    width: '100%',
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
});


