import React from 'react';
import { Text, View, Image } from 'react-native';
import Header from '../components/Header.js';
import ScreenWrapper from '../components/ScreenWrapper.js';
import styles from '../styles.js';

function ArticleDetailsScreen({ route }) {
  const { article } = route.params;

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.articleContainer}>
        <Text style={styles.pageTitle}>{article.title}</Text>
        <Image source={{ uri: article.bannerURL }} style={styles.articleGalleryImage} />
        <Text style={styles.articleGalleryInfo}>
          Published on {new Date(article.createdAt.seconds * 1000).toDateString()} | Author: {article.authorName}
        </Text>
        <Text style={styles.articleContent}>{article.content}</Text>
      </View>
    </ScreenWrapper>
  );
}

export default ArticleDetailsScreen;