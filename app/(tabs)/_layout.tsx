
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { useState } from 'react';

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,   // top header hide garna lai use huncha
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Feather name="trending-up" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: isLoggedIn ? "Profile" : "Login",
          tabBarIcon: ({ color, size }) => (
            <Feather name={isLoggedIn ? "user" : "log-in"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          href: null, // yesla chai tab bar ma dekhaudaina
        }}
      />
      <Tabs.Screen
        name="alert-settings"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}