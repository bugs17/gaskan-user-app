import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'
import { Switch } from 'react-native-switch';
import { Fonts } from '../../constants/Fonts';
import AppleButton from '../Button-apple-custom';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useProfileCompletionStore } from '../../store/profile-completion-store';
import { MotiView } from 'moti';
import * as Linking from 'expo-linking'


const AskingLocationPermitionAndSetLocation = () => {
  const [permissionGranted, setPermissionGranted] = useState(null)
  const [loading, setLoading] = useState(false)
  const {step, setStep} = useProfileCompletionStore()
  const [isOn, setIsOn] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        checkPermission()
    }, [])

    const checkPermission = async () => {
        const { status } = await Location.getForegroundPermissionsAsync()
        if (status === 'granted') {
            setPermissionGranted(true)
            setIsOn(true)
        }else{
            setPermissionGranted(false)
            setIsOn(false)
        }
    }

  const timeoutRef = useRef(null)

  const trigger = () => {
    setShowMessage(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  const requestLocationPermission = async () => {
    if (isOn && permissionGranted) {
      
      trigger()
      return
    }
    setLoading(true)

    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status === 'granted') {
      setPermissionGranted(true)
      setIsOn(true)
    } else {
      setPermissionGranted(false)
      setIsOn(false)
    }

    setLoading(false)
  }

  const isNotDisabled = permissionGranted && isOn

  return (
    <MotiView 
      key={`step-${step}`}
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}>
        <Text style={{textAlign:'center', marginBottom:40, fontFamily:Fonts.bold, fontSize:20}}>📍 Izin Lokasi</Text>
      
      {/* ===== Permission Section ===== */}
      <View style={styles.permissionBox}>
          <Text style={styles.title}>Izinkan Lokasi</Text>
          <Text style={styles.subtitle}>
            Kami membutuhkan lokasi Anda untuk menentukan titik pengantaran.
          </Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>
              Akses Lokasi
            </Text>

            <Switch
                value={permissionGranted}
                onValueChange={requestLocationPermission}
                disabled={loading}

                /* ukuran ala iOS */
                circleSize={26}
                barHeight={30}
                switchWidthMultiplier={2.2}

                /* thumb */
                circleBorderWidth={0}
                circleActiveColor="#FFFFFF"
                circleInActiveColor="#FFFFFF"

                /* track */
                backgroundActive="#8A63F6"      // brand color
                backgroundInactive="#E5E5EA"    // iOS gray
                switchBorderRadius={30}

                /* spacing supaya thumb stay di dalam track */
                switchLeftPx={2}
                switchRightPx={2}

                /* iOS style = no text */
                renderActiveText={false}
                renderInActiveText={false}
            />

          </View>
        </View>

      {showMessage && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ color: '#666', fontSize: 13 , fontFamily:Fonts.regular}}>
            Aplikasi tidak dapat mencabut izin lokasi secara otomatis.
            Silakan nonaktifkan melalui Pengaturan → Izin → Lokasi.
          </Text>

          <Text
            style={{ color: '#8A63F6', marginTop: 8, fontFamily:Fonts.regular }}
            onPress={() => Linking.openSettings()}
          >
            Buka Pengaturan
          </Text>
        </View>
      )}

      <View style={{marginTop:20, flexDirection:'column', gap:8}}>
          <AppleButton title="Lanjut" 
                        onPress={() => setStep(3)} 
                        color={'#8A63F6'}
                        disabled={!isNotDisabled}
                        style={{
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.18)",
                                ...(isNotDisabled && {boxShadow: "0px 6px 12px rgba(138, 99, 246, 0.28)"}),
                            }}
            />
            <AppleButton
              color="#F2F2F7"
              textStyle={{ color: "#000" }}
              style={{ borderWidth: 1, borderColor: "rgba(0,0,0,0.08)", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.28)" }}
              title="Kembali"
              onPress={() => setStep(1)}
              leftIcon={<ArrowLeftIcon size={12} color={'#8E8E93'} />}
          />
      </View>

    </MotiView>
  )
}

export default AskingLocationPermitionAndSetLocation


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:20
  },

  permissionBox: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: 16,
    color: '#111',
    marginBottom: 4,
    fontFamily:Fonts.semibold
  },

  subtitle: {
    fontSize: 13,
    color: '#6E6E73',
    marginBottom: 12,
    fontFamily:Fonts.semibold
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  switchLabel: {
    fontSize: 15,
    color: '#111',
    fontFamily:Fonts.semibold
  },


})
