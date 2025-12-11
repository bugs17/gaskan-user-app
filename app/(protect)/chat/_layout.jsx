import { Stack } from 'expo-router'
import { Platform } from 'react-native'

const ChatLayout = () => {
  const isIos = Platform.OS === 'ios'

  return (
    <>
      <Stack>
          <Stack.Screen name='index' options={{
              headerShown:false,
              animation: isIos ? "ios_from_right" : "slide_from_right", gestureEnabled: true
          }} />
          
      </Stack>
          
    </>
  )
}

export default ChatLayout