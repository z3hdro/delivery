/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from 'navigation/RootNavigator';
import { AppProvider } from 'providers/AppProvider';
import { LocationWrapper } from 'wrapper/LocationWrapper';

import 'localization/i18n.config';

const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    'Roboto': require('./src/assets/fonts/Roboto-Regular.otf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        onLayout={onLayoutRootView}
        style={[
          styles.gestureHandlerContainer
        ]}>
        <AppProvider>
          <LocationWrapper>
            <StatusBar style="dark" />
            <RootNavigator />
          </LocationWrapper>
        </AppProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  }
});

export default App;
