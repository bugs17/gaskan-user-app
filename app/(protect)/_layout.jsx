import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PlaceOrderOverlay from '../../components/Place-order-loading-screen';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useAuth } from '../../utils/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supa';


export default function ProtectedLayout() {

  
  const isIos = Platform.OS === 'ios'

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        setLoading(true)
        
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        
        return () => {
          subscription.unsubscribe()
        }

        
    }, [])
  
    if (loading) return null 

  if (!session && !loading) {
    return <Redirect href={'/(public)/login'} />
  }

  return (
        <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <StatusBar style='dark' />
            <KeyboardProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="menu" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="warung" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="chat" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="detail-order" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="settings" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="live-tracking" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="notifikasi" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                        <Stack.Screen name="pin-lokasi" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
                    </Stack>
            </KeyboardProvider>
            <PlaceOrderOverlay />
        </BottomSheetModalProvider>
        </GestureHandlerRootView>

  );
}

