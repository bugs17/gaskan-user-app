import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const WalletLayout = () => {
  const isIos = Platform.OS === 'ios'

  return (
    <>
      <Stack>
          <Stack.Screen name='topup' options={{
              headerShown:false,
              animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true
          }} />
          <Stack.Screen name='withdraw' options={{
              headerShown:false,
              animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true
          }} />
          
          
      </Stack>
          
    </>
  )
}

export default WalletLayout