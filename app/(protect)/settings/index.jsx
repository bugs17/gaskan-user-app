import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView, Alert } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeftIcon, CameraIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Fonts } from '../../../constants/Fonts'
import { useState } from 'react'
import { useSafePush } from "../../../utils/useSafePush";
import MapPlaceHolder from '../../../components/map/placeholder'
import * as Location from 'expo-location';

const EditProfil = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const push = useSafePush()

  const [name, setName] = useState("Budi Santoso")
  const [phone, setPhone] = useState("081234567890")
  const [addressNote, setAddressNote] = useState("Apartemen blok B")

  const avatar = "https://placehold.co/100x100"

  const handleGoToPinLocationScreen = async () => {
    // kita melakukan pengecekan ijin lokasi terlebih dahulu karena halaman yang kita tuju butuh ijin lokasi
    // jadi jika ijin di berikan baru kita teruskan ke halaman tersebut jika tidak maka kita return dan stay di screen ini.
    const { status: existingStatus } = await Location.getForegroundPermissionsAsync();

    if (existingStatus !== 'granted') {
    // kalau belum granted → request
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Izin lokasi diperlukan agar fitur berjalan dengan baik.");
        return null;
      }
    }
    push('/pin-lokasi')

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={24} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profil</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <Pressable style={styles.avatarBtn}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.cameraBadge}>
              <CameraIcon size={18} color="#fff" />
            </View>
          </Pressable>
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={[styles.input, ]}
            cursorColor={'#8A63F6'}
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama lengkap"
            
          />

          <Text style={styles.label}>Nomor HP</Text>
          <TextInput
            style={styles.input}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            cursorColor={'#8A63F6'}
          />

          <Text style={styles.label}>Lokasi Alamat</Text>
          
          {/* MAP PLACEHOLDER */}
          <Pressable style={styles.mapPlaceholder} onPress={handleGoToPinLocationScreen}>
            <MapPlaceHolder coordinate={[140.330025, -6.092943]}/>
            <View style={{
              position: 'absolute',
              backgroundColor: "#191919b5",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={styles.mapText}>📍 Tap untuk pin lokasi di Maps</Text>
            </View>
          </Pressable>

          {/* Address Description */}
          <Text style={[styles.label, { marginTop: 12 }]}>Keterangan Alamat</Text>
          <TextInput
            style={[styles.input]}
            cursorColor={'#8A63F6'}
            value={addressNote}
            onChangeText={setAddressNote}
            placeholder="Contoh: Apartemen Jony lantai 12 pintu biru"
          />

        </View>

        <Pressable onPress={() => {}} style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{ color: '#FF4D4F', fontFamily: Fonts.semibold, fontSize: 14 }}>
            Hapus Akun
          </Text>
        </Pressable>

      </ScrollView>

      {/* SAVE BUTTON */}
      <View style={[styles.saveWrapper, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
        </Pressable>
        
      </View>

    </SafeAreaView>
  )
}

export default EditProfil

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F6F7",
  },
  headerTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    color: "#000",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarBtn: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E0E0E0",
  },
  cameraBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)",
  },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F5F6F7",
    borderRadius: 14,
    marginBottom: 14,
  },
  mapPlaceholder: {
    height: 130,
    borderRadius: 14,
    position:'relative',
    overflow:'hidden'
  },
  mapText: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "#fff",
  },
  saveWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    alignItems: "center",
    backgroundColor: "#F5F6F7",
    paddingTop: 10,
  },
  saveBtn: {
    width: "92%",
    paddingVertical: 14,
    backgroundColor: "#8A63F6",
    borderRadius: 16,
    alignItems: "center",
  },
  saveBtnText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: "#fff",
  },
})
