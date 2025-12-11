// ChatDetailScreen.jsx
import { useRouter } from "expo-router";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../../constants/Fonts";

function generateOrderId() {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `#ORD-${new Date().getFullYear()}-${random}`;
}

// Contoh data chat
const chatData = [
  { id: '1', sender: 'Anda', message: 'Halo, saya mau tanya order saya.' },
  { id: '2', sender: 'Driver', message: 'Halo, ada yang bisa saya bantu?' },
  { id: '3', sender: 'Anda', message: 'Kapan pesanan saya dikirim?' },
  { id: '4', sender: 'Driver', message: 'Sekitar 15 menit lagi.' },
];

export default function ChatDetailScreen() {
  const orderId = generateOrderId();
  const router= useRouter()

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'Anda';
    return (
      <Text style={styles.chatText}>
        <Text style={isUser ? styles.userLabel : styles.driverLabel}>
          {item.sender}:
        </Text>{' '}
        <Text style={styles.message}>{item.message}</Text>
      </Text>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={{ width: 22 }} />
      </View>

      {chatData.length > 0 ? (
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
        />

      ):(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{ color: '#666', fontFamily: Fonts.regular }}>
            Tidak ada riwayat chat!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: Fonts.semibold,
    color: "#000",
    fontSize: 16,
  },
  chatContainer: { paddingBottom: 20, paddingHorizontal:20 },
  chatText: { marginBottom: 8, fontSize: 16 },
  userLabel: { color: '#8A63F6', fontWeight: 'bold' }, // biru
  driverLabel: { color: '#34C759', fontWeight: 'bold' }, // merah/orange
  message: { color: '#000' },
});
