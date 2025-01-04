import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#1c59d4', 
      tabBarInactiveTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1c59d4',
      },
      headerTintColor: 'white',
      tabBarActiveBackgroundColor: 'white',
      tabBarInactiveBackgroundColor: '#1c59d4'
      }}>
      <Tabs.Screen name="index" options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }} />
      <Tabs.Screen name="chat" options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} size={24}/>
          ),
        }} />
      <Tabs.Screen name="search" options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24}/>
          ),
        }} />
    </Tabs>
  );
}
