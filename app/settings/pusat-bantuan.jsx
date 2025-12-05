import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { Fonts } from '../../constants/Fonts';

const HelpCenterScreen = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();

  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/6281234567890");
  };

  const helpItems = [
    { title: "Masalah Order", desc: "Kesulitan melakukan atau melacak pesanan." },
    { title: "Wallet & Pembayaran", desc: "Top-up, withdraw & pembayaran gagal." },
    { title: "Akun & Profil", desc: "Update profil, lupa password, nomor berubah." },
    { title: "Pengiriman & Driver", desc: "Driver lama datang atau tidak ada driver." },
    { title: "Lainnya", desc: "Butuh bantuan lainnya terkait penggunaan aplikasi." },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: inset.bottom + 20 }}>

        {/* Kartu Bantuan */}
        {helpItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>

            <TouchableOpacity onPress={openWhatsApp}>
              <Text style={styles.askMore}>Laporkan masalah </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Hubungi CS langsung */}
        <TouchableOpacity onPress={openWhatsApp} style={styles.csCard}>
          <Text style={styles.csText}>Hubungi Customer Service via WhatsApp</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F6F7",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
  },
  cardTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "#1C1C1E",
  },
  cardDesc: {
    fontSize: 13,
    color: "#6C6C70",
    marginTop: 4,
    marginBottom: 10,
  },
  askMore: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
    color: "#8A63F6",
  },
  csCard: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },
  csText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.semibold,
  },
});
