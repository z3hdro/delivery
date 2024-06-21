/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import YaMap, { Geocoder } from 'react-native-yamap';
import { Provider } from 'react-redux';

import { RootNavigator } from 'navigation/RootNavigator';
import { AppProvider } from 'providers/AppProvider';
import { LocationWrapper } from 'wrapper/LocationWrapper';
import { persistor, store } from 'store/store';

import 'localization/i18n.config';

import yandexConfig from './secrets/yandex_config.json';
import { PersistGate } from 'redux-persist/integration/react';

void YaMap.init(yandexConfig.API_KEY);
void Geocoder.init(yandexConfig.GEOCODER_API_KEY);

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView
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
      </PersistGate>
    </Provider>
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
