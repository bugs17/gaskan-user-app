import { Stack } from 'expo-router'
import { Platform } from 'react-native'
import FancyFloatingCart from '../../components/Floating-chart-button'

const SettingsLayout = () => {
  const isIos = Platform.OS === 'ios'

  return (
    <>
      <Stack>
          <Stack.Screen name='index' options={{
              headerShown:false,
              animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true
          }} />
          
      </Stack>
      {/* <FancyFloatingCart /> */}
          
    </>
  )
}

export default SettingsLayout