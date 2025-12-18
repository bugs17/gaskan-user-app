import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { Switch } from 'react-native-switch'
import { Fonts } from '../../constants/Fonts'
import { useProfileCompletionStore } from '../../store/profile-completion-store'
import { supabase } from '../../utils/supa'
import AppleButton from '../Button-apple-custom'

const AskingNotificationPermission = () => {
  const { step, setStep, firstName, lastName, phone, address, coordinates } = useProfileCompletionStore()
  const [permissionGranted, setPermissionGranted] = useState(null)
  const [isOn, setIsOn] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [error, setError] = useState('')
  const [isOnSubmit, setIsOnSubmit] = useState(false)

  const router = useRouter()

  /* ===== initial permission check ===== */
  useEffect(() => {
    checkPermission()
  }, [])

  const checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync()

    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
      setPermissionGranted(true)
      setIsOn(true)
    } else {
      setPermissionGranted(false)
      setIsOn(false)
    }
  }

  /* ===== helper for auto-hide message ===== */
  const timeoutRef = useRef(null)

  const triggerMessage = () => {
    setShowMessage(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  /* ===== request permission ===== */
  const requestNotificationPermission = async () => {
    // jika sudah granted lalu user mencoba OFF
    if (isOn && permissionGranted) {
      triggerMessage()
      return
    }

    setLoading(true)

    const { status } = await Notifications.requestPermissionsAsync()

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


  const handleNext = async () => {
    setIsOnSubmit(true)
    if (!firstName || !lastName || !phone || !address || coordinates.longitude === null || coordinates.latitude === null) {
      setError("Data masih kurang. kembali untuk mengecek. data dan izin harus lengkap untuk proses lanjut.")
      setIsOnSubmit(false)
      return
    }

    try {
      
      const res = await supabase.auth.getUser()
      const authError = res.error
      if (authError) {
        setError(authError.message)
        return
      }
      const userId = res.data?.user?.id
      if (!userId) {
        setError("Unauthorized user")
        return
      }
  
      const {status, error} = await supabase
        .from('profile_customer')
        .insert({
          user_id: userId,
          first_name:firstName,
          last_name: lastName,
          phone:phone,
          address_text:address,
          longitude:coordinates.longitude,
          latitude:coordinates.latitude
        })
        .single()
  
        if (error) {
          setError("Terjadi kesalahan. Coba lagi!")
          return
        }
  
        const resultRpc = await supabase
        .rpc('assign_role', {
          p_role: "customer"
        })
        const rpcError = resultRpc.error
        const rpcData = resultRpc.data
        if (rpcError) {
          console.log(rpcError)
          return
        }


        router.replace('/(tabs)')
    } catch (error) {
      console.log("Terjadi error saat submit profile completion")
    }finally{
      setIsOnSubmit(false)
    }

  }

  

  return (
    <MotiView
      key={`step-${step}`}
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >

    <View style={styles.headerWraper}>
      <Text style={styles.headerText}>🔔 Izin Notifikasi</Text>
      {isOnSubmit && (<ActivityIndicator size={'small'} color={'#8A63F6'} />)}
    </View>

      {/* ===== Permission Card ===== */}
      <View style={styles.permissionBox}>
        <Text style={styles.title}>Izinkan Notifikasi</Text>
        <Text style={styles.subtitle}>
          Kami menggunakan notifikasi untuk memberi tahu status pesanan,
          pesan dari driver, dan informasi penting lainnya.
        </Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notifikasi</Text>

          <Switch
            value={permissionGranted}
            onValueChange={requestNotificationPermission}
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
            backgroundActive="#8A63F6"
            backgroundInactive="#E5E5EA"
            switchBorderRadius={30}

            switchLeftPx={2}
            switchRightPx={2}

            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>
      </View>

      {/* ===== cannot revoke info ===== */}
      {showMessage && (
        <View style={{ marginTop: 12 }}>
          <Text style={styles.infoText}>
            Aplikasi tidak dapat menonaktifkan izin notifikasi secara otomatis.
            Silakan ubah melalui Pengaturan → Notifikasi.
          </Text>

          <Text
            style={styles.settingsLink}
            onPress={() => Linking.openSettings()}
          >
            Buka Pengaturan
          </Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* ===== actions ===== */}
      <View style={{ marginTop: 20, gap: 8 }}>
        <AppleButton
          title="Lanjut"
          onPress={handleNext}
          color="#8A63F6"
          disabled={!isNotDisabled || isOnSubmit}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.18)',
            ...(isNotDisabled && {
              boxShadow: '0px 6px 12px rgba(138, 99, 246, 0.28)',
            }),
          }}
        />

        <AppleButton
          title="Kembali"
          color="#F2F2F7"
          textStyle={{ color: '#000' }}
          disabled={isOnSubmit}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.28)',
          }}
          onPress={() => setStep(3)}
          leftIcon={<ArrowLeftIcon size={12} color="#8E8E93" />}
        />
      </View>

      
    </MotiView>
  )
}

export default AskingNotificationPermission

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headerWraper: {
    marginBottom: 40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center",
    gap:10
  },
  headerText: {
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: 20,
  },

  permissionBox: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
  },

  title: {
    fontSize: 16,
    color: '#111',
    marginBottom: 4,
    fontFamily: Fonts.semibold,
  },

  subtitle: {
    fontSize: 13,
    color: '#6E6E73',
    marginBottom: 12,
    fontFamily: Fonts.regular,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  switchLabel: {
    fontSize: 15,
    color: '#111',
    fontFamily: Fonts.semibold,
  },

  infoText: {
    color: '#666',
    fontSize: 13,
    fontFamily: Fonts.regular,
  },

  settingsLink: {
    color: '#8A63F6',
    marginTop: 8,
    fontFamily: Fonts.semibold,
  },
  error: {
    color: "red",
    marginBottom: 12,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
})
