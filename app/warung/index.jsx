import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {Fonts} from '../../constants/Fonts'

const Index = () => {
  const router = useRouter();
  const inset= useSafeAreaInsets()

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={styles.container}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.4 }
            ]}
          >
            <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
          </Pressable>

          <Text style={styles.headerTitle} numberOfLines={1}>
            Pele Drink Cafe
          </Text>
        </View>

        {/* CONTENT */}
        <ScrollView 
          contentContainerStyle={{ padding: 16, paddingBottom: inset.bottom + 80 }}
          showsVerticalScrollIndicator={false}
        >

          {/* Card: Detail Warung */}
          <View style={styles.card}>
            <Text style={styles.title}>Informasi Warung</Text>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Nama</Text>
              <Text style={styles.value}>Pele Drink Cafe</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Alamat</Text>
              <Text style={styles.value}>Jl. Kenangan No. 12, Jakarta</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Jam Operasional</Text>
              <Text style={styles.value}>08:00 - 22:00</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Status</Text>
              <Text style={[styles.value, { color: "#34C759" }]}>Buka</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Kategori</Text>
              <Text style={styles.value}>Minuman · Cafe</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Telpon</Text>
              <Text style={styles.value}>0812-3456-7890</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Rating</Text>
              <Text style={styles.value}>4.7 ★</Text>
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.label}>Deskripsi</Text>
              <Text style={styles.descriptionText}>
                Tempat minum kekinian dengan suasana cozy, menyediakan berbagai menu 
                minuman seperti kopi, teh, dan boba. Cocok untuk nongkrong maupun 
                bekerja santai.
              </Text>
            </View>
          </View>

          {/* Card: Maps Placeholder */}
          <View style={styles.mapCard}>
            <Text style={styles.mapTitle}>Lokasi</Text>

            <View style={styles.mapPlaceholder} />

            <Pressable 
              style={({ pressed }) => [
                styles.mapButton,
                pressed && { opacity: 0.5 }
              ]}
            >
              <Text style={styles.mapButtonText}>Lihat di Maps</Text>
            </Pressable>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },

  /* HEADER */
  header: {
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F5F6F7",
  },
  backButton: {
    padding: 6,
    borderRadius: 100,
  },
  headerTitle: {
    fontSize: 20,
    color: "#000",
    flex: 1,
    fontFamily:Fonts.bold
  },

  /* CARD STYLE */
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    color: "#000",
    marginBottom: 14,
    fontFamily:Fonts.bold
  },
  detailRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#6D6E71",
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    color: "#000",
    fontFamily:Fonts.semibold
  },

  descriptionBox: {
    marginTop: 10,
  },
  descriptionText: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontFamily:Fonts.regular
  },

  /* MAP CARD */
  mapCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
  },
  mapTitle: {
    fontSize: 17,
    color: "#000",
    marginBottom: 12,
    fontFamily:Fonts.bold
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: "#000",
    borderRadius: 18,
    marginBottom: 14,
  },
  mapButton: {
    paddingVertical: 10,
  },
  mapButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#007AFF",
    fontFamily:Fonts.semibold
  }
});
