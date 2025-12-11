import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Fonts } from '../../../constants/Fonts'
import { useSafePush } from '../../../utils/useSafePush'

// Fungsi untuk generate random ID 5 karakter
const generateOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `#ORD-2025-${result}`
}

// Fungsi untuk generate random tanggal (dalam format DD/MM/YYYY)
const generateDate = () => {
  const start = new Date(2025, 0, 1).getTime()
  const end = new Date().getTime()
  const date = new Date(Math.floor(Math.random() * (end - start)) + start)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

// Fungsi untuk generate status
const generateStatus = () => {
  const statuses = [
    { status: 'Sukses' },
    { status: 'Dibatalkan', by: 'User' },
    { status: 'Dibatalkan', by: 'Driver' },
    { status: 'Dibatalkan', by: 'Pembeli' },
  ]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

const RiwayatOrder = () => {
  const router = useRouter()
  const inset = useSafeAreaInsets()
  const push = useSafePush()

  // Buat 8 transaksi random
  const transactions = Array.from({ length: 8 }, () => ({
    id: generateOrderId(),
    date: generateDate(),
    ...generateStatus(),
  }))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Riwayat Order</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom + 20 }}
      >
        {transactions.map((tx, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => push('/settings/riwayat-order-detail-screen')} // nanti bisa link ke detail
          >
            <Text style={styles.orderId}>{tx.id}</Text>
            <Text style={styles.date}>{tx.date}</Text>
            <Text
              style={[
                styles.status,
                tx.status === 'Sukses' ? styles.sukses : styles.cancelled,
              ]}
            >
              {tx.status === 'Sukses' ? 'Sukses' : `Dibatalkan (${tx.by})`}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

export default RiwayatOrder

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
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)"
  },
  orderId: {
    fontFamily: Fonts.semibold,
    fontSize: 15,
    color: "#000",
    marginBottom: 4,
  },
  date: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
  },
  sukses: { color: '#28A745' },      // hijau
  cancelled: { color: '#FF4D4F' },    // merah
})
