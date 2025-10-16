/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { request } from './src/api/requests';
import { AxiosError } from 'axios';

const getShifts = async () => {
  try {
    const { data } = (
      await request.getShifts({
        latitude: 45.039268,
        longitude: 38.987221,
      })
    ).data;
    console.log('Shifts:', data);
  } catch (e) {
    const error = e as AxiosError;
    console.log('Failing shifts load, error', error);
  }
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  getShifts();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
