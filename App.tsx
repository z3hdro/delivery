/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from 'navigation/RootNavigator';
import { AppProvider } from 'providers/AppProvider';
import { LocationWrapper } from 'wrapper/LocationWrapper';
import yandexConfig from './secrets/yandex_config.json';

import 'localization/i18n.config';
import YaMap from 'react-native-yamap';

void YaMap.init(yandexConfig.API_KEY);

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto': require('./src/assets/fonts/Roboto-Regular.otf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.otf'),
  });

  useEffect(() => {
    void (async () => {
      await YaMap.setLocale('ru_RU');
      await YaMap.resetLocale();
    })();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        // onLayout={onLayoutRootView}
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
