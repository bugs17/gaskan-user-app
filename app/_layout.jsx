import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlaceOrderOverlay from '../components/Place-order-loading-screen';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SfThin: require('../assets/fonts/SF-Pro-Rounded-Thin.otf'),
    SfRegular: require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
    SfMedium: require('../assets/fonts/SF-Pro-Rounded-Medium.otf'),
    SfSemibold: require('../assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    SfBold: require('../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    // ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const isIos = Platform.OS === 'ios'

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>

          <StatusBar style='dark' />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
            <Stack.Screen name="warung" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
            <Stack.Screen name="chat" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
            <Stack.Screen name="detail-order" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
            <Stack.Screen name="settings" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
            <Stack.Screen name="live-tracking" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
          </Stack>
          <PlaceOrderOverlay />
      </BottomSheetModalProvider>

    </GestureHandlerRootView>

  );
}
