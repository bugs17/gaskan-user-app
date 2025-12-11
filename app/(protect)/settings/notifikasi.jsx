import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Fonts } from '../../../constants/Fonts'
import { useState } from 'react'

const Notifikasi = () => {
  const router = useRouter()
  const inset = useSafeAreaInsets()

  const [allowNotif, setAllowNotif] = useState(true)
  const [orderNotif, setOrderNotif] = useState(true)
  const [chatNotif, setChatNotif] = useState(true)
  const [promoNotif, setPromoNotif] = useState(false)
  const [sound, setSound] = useState(true)
  const [vibrate, setVibrate] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={["top"]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifikasi 🔔</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom + 100 }}
      >

        {/* IZINKAN */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>🛎️ Izinkan Notifikasi</Text>
            <Switch
              value={allowNotif}
              onValueChange={setAllowNotif}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* KATEGORI */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>📦 Status Pesanan</Text>
            <Switch
              value={orderNotif}
              onValueChange={setOrderNotif}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>💬 Chat Driver</Text>
            <Switch
              value={chatNotif}
              onValueChange={setChatNotif}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>🏷️ Promo & Diskon</Text>
            <Switch
              value={promoNotif}
              onValueChange={setPromoNotif}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* SUARA & GETAR */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>🔊 Suara</Text>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>📳 Getar</Text>
            <Switch
              value={vibrate}
              onValueChange={setVibrate}
              trackColor={{ false: "#ccc", true: "#8A63F6" }}
              thumbColor="#fff"
            />
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Notifikasi

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
    color: "#000",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)"
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: "#000",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
})
