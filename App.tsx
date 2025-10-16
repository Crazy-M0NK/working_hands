import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/screens/Home';
import { StackParamList } from './src/types';
import { ShiftScreen } from './src/screens/Shift';

const Stack = createNativeStackNavigator<StackParamList>();

const basicScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  contentStyle: { backgroundColor: '#060503' },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          { marginTop: insets.top, marginBottom: insets.bottom },
        ]}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={basicScreenOptions}
            initialRouteName={'home'}
          >
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="shift" component={ShiftScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
});
