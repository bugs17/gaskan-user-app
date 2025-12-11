import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, Slot } from 'expo-router'
import { useEffect, useState } from 'react'

const OnBoardingLayout = () => {
    const [isDone, setIsDone] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getDataAsyncStorage = async () => {
            const data = await AsyncStorage.getItem('onboarding_done')
            setIsDone(data === "true")
            setLoading(false)
        }
        getDataAsyncStorage()
    },[])

    if (loading) return null;

    if (isDone) {
        return <Redirect href={'/(public)/login'} />
    }


  return (
    <Slot />
  )
}

export default OnBoardingLayout