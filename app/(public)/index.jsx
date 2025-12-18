import { makeRedirectUri } from 'expo-auth-session'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../utils/supa'


const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((v) => v - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleMagicLink = async () => {
    Keyboard.dismiss()
    setError('')
    if (!email) {
      setError('Email tidak boleh kosong')
      return
    }

    if (cooldown > 0) return

    try {
      setCooldown(60)

      const redirectTo = makeRedirectUri({
        scheme: 'pembeliapp',
        path: 'callback',
      })

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      })

      if (error) {
        setError(error.message || 'Gagal mengirim link')
        return
      }

      setSent(true)
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi.')
    }
  }

  

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Masuk atau Daftar</Text>
      <Text style={styles.subtitle}>
        Masukkan email untuk melanjutkan
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email kamu"
        placeholderTextColor={'#414141ff'}
        cursorColor={'#414141ff'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(v) => {
          setEmail(v)
          setError('')
        }}
      />

      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleMagicLink}
        disabled={cooldown > 0}
        style={[
          styles.button,
          styles.magicBtn,
          cooldown > 0 && { opacity: 0.6 },
        ]}
      >
        <Text style={styles.buttonText}>
          {cooldown > 0
            ? `Coba lagi dalam ${cooldown}s`
            : 'Kirim Link Masuk'}
        </Text>
      </TouchableOpacity>

      {sent && (
        <Text style={styles.infoText}>
          Periksa email Anda untuk melanjutkan masuk.
        </Text>
      )}
    </View>
  )
}

export default AuthScreen


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

  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    backgroundColor: '#F2F2F7',
    fontSize: 16,
    color: '#111',
    marginBottom: 16,
  },

  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  magicBtn: {
    backgroundColor: '#000',
    marginBottom: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },

  infoText: {
    fontSize: 13,
    color: '#34C759',
    marginTop: 6,
  },

  bottomText: {
    fontSize: 14,
    color: '#6E6E73',
  },

  bottomLink: {
    fontWeight: '600',
    color: '#007AFF',
  },
})