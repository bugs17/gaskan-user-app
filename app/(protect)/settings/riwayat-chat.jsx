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

const RiwayatChat = () => {
  const router = useRouter()
  const inset = useSafeAreaInsets()
  const push = useSafePush()

  // Buat 8 transaksi random
  const transactions = Array.from({ length: 8 }, () => ({
    id: generateOrderId(),
  }))

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Riwayat Chat</Text>
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
            onPress={() => push('/settings/chatDetailScreen')}
          >
            <Text style={styles.orderId}>{tx.id}</Text>
          </Pressable>
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

export default RiwayatChat

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
  },
})
