import React, { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc, db } from '../firebaseConfig';
import Header from '../components/Header.js';
import ScreenWrapper from '../components/ScreenWrapper.js';
import styles from '../styles.js';

function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
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
                Published on {new Date((article.createdAt?.seconds || 0) * 1000).toDateString()} | Author: {article.authorName}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScreenWrapper>
  );
}

export default HomeScreen;