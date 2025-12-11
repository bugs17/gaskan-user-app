import { Slot, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../utils/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supa";

export default function PublicLayout() {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingOnBoarding, setLoadingOnBoarding] = useState(true)
    const [onboardingDone, setOnboardingDone] = useState(null)

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

    useEffect(() => {
        const getOnBoardingStatus = async () => {
            const value = await AsyncStorage.getItem("onboarding_done")
            setOnboardingDone(value === "true")
            setLoadingOnBoarding(false)

        }
        getOnBoardingStatus()
    },[])

    if (loading || loadingOnBoarding) return null

    if (!onboardingDone) {
    return <Redirect href="/(on-boarding)" />
    }

    if (!session) {
    return <Slot />
    }

    return <Redirect href="/(protected)" />
}
