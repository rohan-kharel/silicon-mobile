import React from 'react';
import { Text } from 'react-native';
import Header from '../components/Header.js';
import ScreenWrapper from '../components/ScreenWrapper.js';

function SettingsScreen() {
  return (
    <ScreenWrapper>
      <Header />
      <Text>Settings Screen</Text>
    </ScreenWrapper>
  );
}

export default SettingsScreen;