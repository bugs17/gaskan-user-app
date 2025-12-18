import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppleButton from '../../components/Button-apple-custom'
import { AnimatePresence, MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'
import { Fonts } from '../../constants/Fonts'
import imgae1 from '../../assets/images/emptyman1.png'
import ramen from '../../assets/images/step1.png'
import secure from '../../assets/images/step2.png'
import {useSafePush} from '../../utils/useSafePush'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {height, width} = Dimensions.get('screen')

const steps = [
    {
        "key":1,
        "title": "Pesan Makanan Dari Warung Terdekat",
        "description": "Temukan beragam pilihan makanan dari warung di sekitar kamu dengan cepat dan mudah.",
        "img": ramen
    },
    {
        "key":2,
        "title": "Pembayaran Aman & Praktis",
        "description": "Pilihan pembayaran fleksibel dan aman saat pesananmu tiba.",
        "img": secure
    },
    {
        "key":3,
        "title": "Pengantaran Cepat & Aman",
        "description": "Driver siap mengantar pesananmu dengan cepat dan aman.",
        "img": imgae1
    },
]

const OnBoardingScreen = () => {
    const [stepIndex, setStepIndex] = useState(1)
    const push = useSafePush()
    const progressWidth = ((width - 40) / steps.length ) * stepIndex;

    

    

    const handleNext = async () => {
        if (stepIndex < steps.length) {
            setStepIndex(prev => prev + 1)
        } else {
            console.log('Onboarding selesai')
            await AsyncStorage.setItem("onboarding_done", "true")
            push('/(public)/index')
             // reset ke 1
        }
    }

  return (
    <View style={{backgroundColor:'#fff', flex:1, paddingHorizontal:40,}}>

        {/* view render image, title & desc */}
      <View style={{height:height / 1.3, width:'100%'}}>
            <AnimatePresence exitBeforeEnter>
                <OnBoardingComponent
                    step={steps[stepIndex - 1]}
                    keyStep={steps[stepIndex - 1].key}
                />
            </AnimatePresence>
      </View>


      {/* view render button */}
      <View style={{flex:1, justifyContent:'flex-start', gap:14}}>
        <View style={[styles.progressBackground]}>
            <MotiView
                style={styles.progressFill}
                animate={{ width: progressWidth }}
                transition={{ type: "timing", duration: 1000 }}
            />
        </View>
        <AppleButton style={{boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",}} title={stepIndex  === steps.length ? 'Mulai' : 'Lanjut'} onPress={handleNext} />
      </View>
    </View>
  )
}

export default OnBoardingScreen

function OnBoardingComponent({step, keyStep}) {
    const baseDelay = step.key * 200; // setiap step beda delay 200ms

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
        key={`img-${keyStep}`}
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 800,
          delay: baseDelay + 0, // image muncul dulu
          easing: Easing.out(Easing.exp),
        }}
      >
        <Image
          source={step.img}
          style={{ height: height / 3 }}
          resizeMode="contain"
        />
      </MotiView>

      <MotiView
        key={`title-${keyStep}`}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 800,
          delay: baseDelay + 200, // title muncul setelah image
          easing: Easing.out(Easing.exp),
        }}
        style={styles.footer}
      >
        <Text style={{ textAlign: 'center', fontFamily: Fonts.bold, fontSize: 22, color: '#1C1C1E', lineHeight: 28 }}>
          {step.title}
        </Text>
      </MotiView>

      <MotiView
        key={`desc-${keyStep}`}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 800,
          delay: baseDelay + 400, // description muncul terakhir
          easing: Easing.out(Easing.exp),
        }}
      >
        <Text style={{ textAlign: 'center', fontFamily: Fonts.medium, fontSize: 16, color: '#3C3C43', opacity: 0.8, lineHeight: 22 }}>
          {step.description}
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
    
  footer: { 
        gap: 12
    },
    progressBackground: {
        height: 4,
        width:'100%',
        backgroundColor: "#E5E5EA", // Apple gray
        borderRadius: 2,
        overflow:'hidden'
    },
    progressFill: {
        height: 4,
        backgroundColor: "#8A63F6",
        borderRadius: 2,
    },
})


// setelah selesai proses on-boarding jangan lupa write ini ke AsyncStorage
// AsyncStorage.setItem("onboarding_done", "true")