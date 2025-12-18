import { AnimatePresence, MotiView } from 'moti'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import AskingNotificationPermission from '../../components/profile-completion/step-four-ijin-notifikasi'
import StepOne from '../../components/profile-completion/step-one'
import PinLokasiDanAlamat from '../../components/profile-completion/step-three-pin-location'
import AskingLocationPermitionAndSetLocation from '../../components/profile-completion/step-two-location'
import { useProfileCompletionStore } from '../../store/profile-completion-store'

const {height, width} = Dimensions.get('screen')

const LengkapiProfil = () => {
  const {step} = useProfileCompletionStore()
  const insets = useSafeAreaInsets()
  
  const progressWidth = ((width - 40) / 4) * step;


  

  const renderStep = () => {
    if (step === 1) {
      return <StepOne onNext={() => {}} />
    }if (step === 2) {
      return <AskingLocationPermitionAndSetLocation />
    }if (step === 3) {
      return <PinLokasiDanAlamat />
    }if (step === 4) {
      return <AskingNotificationPermission />
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}} edges={['top']} >
      
        <AnimatePresence exitBeforeEnter>
          {renderStep()}
        </AnimatePresence>


      {/* progres bar */}
      <View  style={{paddingHorizontal:20,marginBottom:insets.bottom + 20,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <View style={styles.progressBackground}>
            <MotiView
                style={styles.progressFill}
                animate={{ width: progressWidth }}
                transition={{ type: "timing", duration: 250 }}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LengkapiProfil

const styles = StyleSheet.create({
  progressBackground: {
        height: 4,
        width: "100%",
        backgroundColor: "#E5E5EA", // Apple gray
        borderRadius: 2,
    },
    progressFill: {
        height: 4,
        backgroundColor: "#8A63F6",
        borderRadius: 2,
    },
})