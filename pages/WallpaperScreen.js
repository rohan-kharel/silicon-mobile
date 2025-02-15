import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header.js';
import ScreenWrapper from '../components/ScreenWrapper.js';

function WallpaperScreen() {
  return (
    <ScreenWrapper>
      <Header />
      <Text>Wallpapers Screen</Text>
    </ScreenWrapper>
  );
}

export default WallpaperScreen;