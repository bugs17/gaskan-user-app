import * as Linking from 'expo-linking';
import { Redirect } from 'expo-router';
import { createSessionFromUrl } from '../utils/create-sessions';

const Callback = () => {
  const url = Linking.useLinkingURL()
  if (url) {
  createSessionFromUrl(url)
    
  }


  return (
    <Redirect href={'/(protect)'} />
  )
}

export default Callback