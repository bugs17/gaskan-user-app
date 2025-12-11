import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import appleIcon from '../../assets/images/apple.png'
import googleIcon from '../../assets/images/google.png'

const SignupScreen = () => {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Buat Akun Baru</Text>
      <Text style={styles.subtitle}>Lengkapi data untuk melanjutkan</Text>

      {/* Google Signup */}
      <TouchableOpacity 
        style={[styles.button, styles.googleBtn]}
        onPress={() => console.log('Daftar dengan Google')}
      >
        <View style={styles.iconRow}>
          <Image source={googleIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Daftar dengan Google</Text>
        </View>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (

        <TouchableOpacity 
          style={[styles.button, styles.appleBtn]}
          onPress={() => console.log('Daftar dengan Apple')}
        >
          <View style={styles.iconRow}>
            <Image source={appleIcon} style={styles.icon} />
            <Text style={[styles.buttonText, styles.appleText]}>Daftar dengan Apple</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Back to Login */}
      <TouchableOpacity 
        onPress={() => router.push('/(public)/login')}
        style={{ marginTop: 24 }}
      >
        <Text style={styles.loginText}>
          Sudah punya akun? <Text style={styles.loginLink}>Masuk</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignupScreen

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
    // gap belum tersedia di semua RN, gunakan margin pada icon sebagai fallback
  },

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },

  loginText: {
    fontSize: 14,
    color: '#6E6E73',
  },

  loginLink: {
    fontWeight: '600',
    color: '#007AFF',
  },
})
