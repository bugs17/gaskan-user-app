import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/Fonts";

const initialNotifications = [
  {
    id: "n1",
    type: "topup",
    title: "Top-Up Berhasil",
    description: "Saldo wallet kamu bertambah Rp50.000.",
    time: "10:30",
  },
  {
    id: "n2",
    type: "order_done",
    title: "Pesanan Selesai",
    description: "Pesanan #ORD-2025-HW3IY berhasil dikirim.",
    time: "09:15",
  },
  {
    id: "n3",
    type: "order_cancel",
    title: "Pesanan Dibatalkan",
    description: "Pesanan #ORD-2025-HW3IY dibatalkan oleh warung.",
    time: "08:50",
  },
  {
    id: "n4",
    type: "system",
    title: "Perbarui Aplikasi",
    description: "Versi terbaru aplikasi sudah tersedia.",
    time: "08:00",
  },
  {
    id: "n5",
    type: "withdraw",
    title: "Withdraw Berhasil",
    description: "Withdraw Rp100.000 telah berhasil diproses.",
    time: "07:45",
  },
  {
    id: "n6",
    type: "withdraw",
    title: "Withdraw Berhasil",
    description: "Withdraw Rp100.000 telah berhasil diproses.",
    time: "07:45",
  },
  {
    id: "n7",
    type: "withdraw",
    title: "Withdraw Berhasil",
    description: "Withdraw Rp100.000 telah berhasil diproses.",
    time: "07:45",
  },
];

const TYPE_CONFIG = {
  topup: { color: "#22C55E", icon: "cash-outline" },
  order_done: { color: "#8A63F6", icon: "checkmark-done-outline" },
  order_cancel: { color: "#EF4444", icon: "close-circle-outline" },
  system: { color: "#6B7280", icon: "notifications-outline" },
  withdraw: { color: "#3B82F6", icon: "arrow-down-outline" }, // biru untuk withdraw
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const router = useRouter();

  const renderItem = useCallback(({ item }) => <NotificationCard item={item} />, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function NotificationCard({ item }) {
    const handleAddReview = () => {
        console.log("Add rating & review clicked for", item.id);
    };

    const handleUpdateApp = () => {
        console.log("Update App clicked for", item.id);
        // nanti kita arahkan ke Play Store / App Store
    };

    const type = TYPE_CONFIG[item.type] || {};
    const color = type.color || "#ccc";
    const iconName = type.icon || "notifications-outline";

    return (
        <View style={[styles.card, { borderLeftColor: color }]}>
        <View style={styles.cardHeader}>
            <Ionicons name={iconName} size={20} color={color} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.cardDesc}>{item.description}</Text>
        <View style={styles.cardFooter}>
            <Text style={styles.cardTime}>{item.time}</Text>
            {item.type === "order_done" && (
            <Pressable onPress={handleAddReview} style={styles.reviewBtn}>
                <Text style={styles.reviewBtnText}>Add Rating & Review</Text>
            </Pressable>
            )}
            {item.type === "system" && (
            <Pressable onPress={handleUpdateApp} style={styles.reviewBtn}>
                <Text style={styles.reviewBtnText}>Update Sekarang</Text>
            </Pressable>
            )}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F6F7",
  },
  headerTitle: {
    fontSize: 15,
    color: "#000",
    fontFamily:Fonts.semibold
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 6px 8px rgba(0,0,0,0.12)",
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    color: "#111111",
    fontFamily:Fonts.bold
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontFamily:Fonts.regular
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTime: {
    fontSize: 11,
    color: "#9CA3AF",
    fontFamily:Fonts.regular
  },
  reviewBtn: {
    backgroundColor: "#8A63F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reviewBtnText: {
    color: "#fff",
    fontSize: 12,
    fontFamily:Fonts.medium
  },
});
