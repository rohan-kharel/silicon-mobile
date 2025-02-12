import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import Header from './components/Header.js';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function ScreenWrapper({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
      {children}
    </ScrollView>
  );
}

function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articlesList = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
          const articleData = docSnapshot.data();
          const authorDoc = await getDoc(doc(db, 'users', articleData.authorId));
          const authorName = authorDoc.exists() ? authorDoc.data().name : 'Unknown Author';
          return {
            id: docSnapshot.id,
            ...articleData,
            authorName,
          };
        }));
        setArticles(articlesList);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ScreenWrapper>
      <Header />
      <Text style={styles.pageTitle}>Latest Articles</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="rgb(0, 0, 80)" />
      ) : (
        articles.map((article) => (
          <TouchableOpacity key={article.id} onPress={() => navigation.navigate('ArticleDetails', { article })}>
            <View style={styles.articleGallery}>
              <Image source={{ uri: article.bannerURL }} style={styles.articleGalleryImage} />
              <Text style={styles.articleGalleryTitle}>{article.title}</Text>
              <Text style={styles.articleGalleryInfo}>
                Published on {new Date(article.createdAt.seconds * 1000).toDateString()} | Author: {article.authorName}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScreenWrapper>
  );
}

function ArticleDetailsScreen({ route }) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.screen}>
      <Header />
      <View style={styles.articleContainer}>
        <Text style={styles.pageTitle}>{article.title}</Text>
        <Image source={{ uri: article.bannerURL }} style={styles.articleGalleryImage} />
        <Text style={styles.articleGalleryInfo}>
          Published on {new Date(article.createdAt.seconds * 1000).toDateString()} | Author: {article.authorName}
        </Text>
        <Text style={styles.articleContent}>{article.content}</Text>
      </View>
    </ScrollView>
  );
}

function SettingsScreen() {
  return (
    <ScreenWrapper>
      <Header />
      <Text>Settings Screen</Text>
    </ScreenWrapper>
  );
}

function WallpaperScreen() {
  return (
    <ScreenWrapper>
      <Header />
      <Text>Wallpapers Screen</Text>
    </ScreenWrapper>
  );
}

function AccountScreen() {
  return (
    <ScreenWrapper>
      <Header />
      <Text>Account Screen</Text>
    </ScreenWrapper>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: "Helvetica",
    fontSize: 35,
    fontWeight: "bold",
    color: "#000050",
    margin: 20,
  },
  articleGallery: {
    marginTop: 10,
    marginBottom: 20,
  },
  articleGalleryImage: {
    width: 360,
    height: 240,
    borderRadius: 20,
    alignSelf: "center",
  },
  articleGalleryTitle: {
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000050",
    alignSelf: "center",
  },
  articleGalleryInfo: {
    marginTop: 10,
    fontFamily: "Helvetica",
    fontSize: 15,
    fontStyle: "italic",
    color: "#000050",
    alignSelf: "center",
  },
  articleContainer: {
    padding: 20,
  },
  articleContent: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "#000050",
    marginTop: 20,
  },
});