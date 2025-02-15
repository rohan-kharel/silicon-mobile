import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './pages/HomeScreen';
import ArticleDetailsScreen from './pages/ArticleDetailsScreen';
import SettingsScreen from './pages/SettingsScreen';
import WallpaperScreen from './pages/WallpaperScreen';
import AccountScreen from './pages/AccountScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Wallpapers') iconName = 'image';
          else if (route.name === 'Account') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(0, 0, 80)',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallpapers" component={WallpaperScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}