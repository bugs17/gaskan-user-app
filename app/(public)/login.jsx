import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import { useRouter } from "expo-router"
import appleIcon from '../../assets/images/apple.png'
import googleIcon from '../../assets/images/google.png'
import { StatusBar } from 'expo-status-bar'

const LoginScreen = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
    <StatusBar style='dark' />
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>
        Masuk untuk melanjutkan
      </Text>

      {/* Google Button */}
      <TouchableOpacity style={[styles.button, styles.googleBtn]}>
        <View style={styles.iconRow}>
          <Image source={googleIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Masuk dengan Google</Text>
        </View>
      </TouchableOpacity>

      
      {Platform.OS === 'ios' && (
        <TouchableOpacity style={[styles.button, styles.appleBtn]}>
          <View style={styles.iconRow}>
            <Image source={appleIcon} style={styles.icon} />
            <Text style={[styles.buttonText, styles.appleText]}>
              Masuk dengan Apple
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Signup */}
      <TouchableOpacity 
        onPress={() => router.push('/(public)/signup')}
        style={{ marginTop: 24 }}
      >
        <Text style={styles.signupText}>
          Belum punya akun? <Text style={styles.signupLink}>Daftar</Text>
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 15,
    color: '#6E6E73',
    marginBottom: 40,
  },

  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  googleBtn: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },

  appleBtn: {
    backgroundColor: '#000',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  appleText: {
    color: '#FFF',
  },

  iconRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10, // kalau RN belum suport gap, nanti aku kasih alternative
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  signupText: {
    fontSize: 14,
    color: '#6E6E73',
  },

  signupLink: {
    fontWeight: '600',
    color: '#007AFF',
  },
})
