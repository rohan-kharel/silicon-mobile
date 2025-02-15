import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ScreenWrapper({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
      {children}
    </ScrollView>
  );
}

export default ScreenWrapper;