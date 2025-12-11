import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Fonts } from "../../../constants/Fonts";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan & Privasi</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* CARD CONTENT */}
        <View style={styles.card}>
          <Text style={styles.title}>Privasi Data Pengguna</Text>
          <Text style={styles.paragraph}>
            Kami menghargai dan menjaga privasi data Anda. Informasi pribadi
            dikumpulkan untuk keperluan verifikasi, transaksi pembayaran, dan
            meningkatkan pengalaman aplikasi.
          </Text>

          <Text style={styles.subtitle}>Informasi yang Kami Kumpulkan</Text>
          <Text style={styles.paragraph}>
            - Nama, nomor telepon, dan alamat email{"\n"}
            - Informasi transaksi dan aktivitas dalam aplikasi{"\n"}
            - Data lokasi untuk layanan pengantaran{"\n"}
            - Informasi pembayaran sesuai metode yang Anda pilih
          </Text>

          <Text style={styles.subtitle}>Keamanan Data</Text>
          <Text style={styles.paragraph}>
            Kami menggunakan sistem keamanan yang mengikuti standar industri
            untuk melindungi data Anda dari akses yang tidak sah.
          </Text>

          <Text style={styles.subtitle}>Berbagi Informasi</Text>
          <Text style={styles.paragraph}>
            Informasi hanya dibagikan kepada mitra yang bekerja sama dalam
            penyediaan layanan, seperti driver atau penyedia layanan pembayaran.
            Kami tidak menjual data Anda ke pihak lain.
          </Text>

          <Text style={styles.subtitle}>Hak Anda</Text>
          <Text style={styles.paragraph}>
            Anda memiliki hak untuk mengakses, mengubah, atau menghapus data
            pribadi Anda kapan saja melalui aplikasi sesuai kebijakan
            regulator.
          </Text>

          <Text style={styles.subtitle}>Perubahan Kebijakan</Text>
          <Text style={styles.paragraph}>
            Kebijakan ini dapat diperbarui sewaktu-waktu. Pengguna akan
            mendapatkan pemberitahuan apabila ada perubahan penting.
          </Text>

          <Text style={[styles.paragraph, { marginTop: 16 }]}>
            Dengan menggunakan aplikasi ini, Anda menyetujui Kebijakan & Privasi
            yang berlaku.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
  },
  title: {
    fontFamily: Fonts.semibold,
    color: "#1C1C1E",
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: Fonts.semibold,
    color: "#1C1C1E",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 4,
  },
  paragraph: {
    color: "#6C6C70",
    fontSize: 13,
    lineHeight: 20,
  },
});
