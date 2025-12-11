import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Fonts } from '../../constants/Fonts'
import { useState } from 'react'

const DetailOrder = () => {
  const router = useRouter()
  const inset = useSafeAreaInsets()

  const [paymentMethod] = useState("Wallet") 
  // atau "Saldo Gaskan" — nanti kamu bisa ganti tergantung data backend

  const items = [
    { id: 1, name: "Es Teh Manis", price: 12000, qty: 1 },
    { id: 2, name: "Ayam Geprek", price: 25000, qty: 1 },
    { id: 3, name: "Ayam Geprek", price: 25000, qty: 1 },
  ]

  const ongkir = 12000
  const total = items.reduce((t, i) => t + i.price * i.qty, 0)
  const grandTotal = total + ongkir

  const payToCourier = paymentMethod === "Cash"
    ? grandTotal
    : 0

  const note = "Tolong sambalnya di pisah ya bang."

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.orderId}>
          #ORD-2025-TQM83
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom + 20 }}
      >
        {/* STATUS */}
        <View style={styles.sectionCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Status Pesanan</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Diproses</Text>
            </View>
          </View>
        </View>

        {/* WARUNG INFO */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Warung</Text>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.shopName}>Warung Ayam Pak Gino</Text>
              <Text style={styles.shopAddress}>Jalan Sudirman No. 10</Text>
            </View>
            <Image
              source={{ uri: "https://placehold.co/60x60" }}
              style={styles.shopImage}
            />
          </View>
        </View>

        {/* ITEM LIST */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pesanan Kamu</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.rowBetween}>
              <Text style={styles.itemName}>{item.name} × {item.qty}</Text>
              <Text style={styles.itemPrice}>
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.subLabel}>Total Makanan</Text>
            <Text style={styles.subPrice}>
              Rp {total.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        {/* PAYMENT METHOD + CALCULATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.itemName}>{paymentMethod}</Text>
            {paymentMethod === "Cash" ? (
              <Text style={styles.itemPrice}>
                Rp {grandTotal.toLocaleString("id-ID")}
              </Text>
            ) : (
              <Text style={[styles.itemPrice, { color: "#34C759" }]}>
                ✔ Sudah dibayar
              </Text>
            )}
          </View>
        </View>

        {/* GRAND TOTAL */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Biaya</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.itemName}>Ongkir</Text>
            <Text style={styles.itemPrice}>
              Rp {ongkir.toLocaleString("id-ID")}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.grandLabel}>Bayar ke Kurir</Text>
            <Text style={styles.grandPrice}>
              Rp {payToCourier.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        {/* NOTE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Catatan</Text>
          <Text style={styles.noteText}>{note || "-"}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailOrder

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: "#F5F6F7",
  },
  orderId: {
    fontFamily: Fonts.semibold,
    color: "#000",
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)"
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Fonts.semibold,
    marginBottom: 10,
    color: "#000",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  itemName: {
    fontFamily: Fonts.regular,
    fontSize: 15
  },
  itemPrice: {
    fontFamily: Fonts.regular,
    fontSize: 15
  },
  subLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 15,
  },
  subPrice: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    color: "#34C759",
  },
  grandLabel: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginTop: 10,
  },
  grandPrice: {
    fontSize: 19,
    fontFamily: Fonts.bold,
    color: "#34C759",
  },
  noteText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#444",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.07)",
    marginVertical: 8,
  },
  shopName: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
  },
  shopAddress: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  shopImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  statusBadge: {
    backgroundColor: "#E8FEE9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusText: {
    fontFamily: Fonts.semibold,
    color: "#3ABD3A",
    fontSize: 13,
  },
})
