import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import LoadingOverlay from '../../components/Loading-overlay';
import PlaceOrderOverlay from '../../components/Place-order-loading-screen';
import { supabase } from '../../utils/supa';


export default function ProtectedLayout() {
  const isIos = Platform.OS === 'ios'
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  /**
   * =========================================================
   * EFFECT 1: ambil session pertama kali + listen auth change
   * =========================================================
   * - effect ini HANYA jalan sekali saat mount
   * - bertugas:
   *   1. ambil session awal
   *   2. subscribe perubahan auth (login / logout)
   */
  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])


  // masih loading session
  if (loading) return null

  // user belum login
  if (!session) {
    return <Redirect href='/(public)' />
  }


  return (
        <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <StatusBar style='dark' />
            <KeyboardProvider>
                    <Stack>
                        <Stack.Screen name="lengkapi-profil" options={{ headerShown: false, animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true }} />
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
            <LoadingOverlay />
        </BottomSheetModalProvider>
        </GestureHandlerRootView>

  );
}

