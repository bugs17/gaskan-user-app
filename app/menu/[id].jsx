import { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { FlashList } from "@shopify/flash-list";
import {  useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRightIcon, ShoppingBagIcon, ShoppingCartIcon } from "react-native-heroicons/outline";
import CartBottomSheet from "../../components/bottom-sheet/CartBottomSheet";
import AppleButton from "../../components/Button-apple-custom";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import {Fonts} from '../../constants/Fonts'
// Dummy related menu items
const relatedMenus = [
  {
    id: "m1",
    name: "Ayam Geprek Level 5",
    price: 18000,
    imageUrl: "https://picsum.photos/300/300?random=1",
  },
  {
    id: "m2",
    name: "Nasi Goreng Special",
    price: 22000,
    imageUrl: "https://picsum.photos/300/300?random=2",
  },
  {
    id: "m3",
    name: "Es Teh Manis",
    price: 5000,
    imageUrl: "https://picsum.photos/300/300?random=3",
  },
];

export default function DetailMenuScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  
  // reanimated
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
  }));



  const item = JSON.parse(params.item);

  useEffect(() => {
    bottomSheetRef.current?.close()
  }, [])




  const renderRelated = useCallback(({ item }) => (
    <Pressable style={styles.relatedCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.relatedImage} />
      <Text style={styles.relatedName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.relatedPrice}>Rp {item.price}</Text>
    </Pressable>
  ), []);




  return (

    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#F5F6F7" }}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* IMAGE */}
          <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />

          {/* INFO CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Menu Information</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Nama</Text>
              <Text style={styles.value}>{item.name}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Harga</Text>
              <Text style={styles.price}>Rp {item.price}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Kategori</Text>
              <Text style={styles.value}>🍛 Makanan</Text>
            </View>
          </View>

          {/* DESCRIPTION CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {item.deskripsi || "Tidak ada deskripsi."}
            </Text>
          </View>

          

          {/* WARUNG CARD */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>Warung</Text>
                <Pressable
                  onPressIn={() => (scale.value = withTiming(0.7, { duration: 80 }))}
                  onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
                  onPress={() => router.push('/warung')}
                >
                  <Animated.View style={animatedStyle}>
                    <ArrowRightIcon size={20} color="#8E8E93" />
                  </Animated.View>
                </Pressable>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Nama Warung</Text>
              <Text style={styles.value}>Warung Bu Tika</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Jarak</Text>
              <Text style={styles.value}>1.2 km</Text>
            </View>
          </View>

          <View style={{marginHorizontal: 16, marginBottom: 18,}}>
            <AppleButton 
              leftIcon={<ShoppingBagIcon color="#fff" size={20} />} 
              title={"Tambah"} onPress={() => bottomSheetRef.current?.present()} 
              style={{boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)"}}
              />
          </View>

          

          {/* RELATED MENUS */}
          <View style={{ marginTop: 6 }}>
            <Text style={styles.sectionTitle}>Menu lainnya</Text>

            <FlashList
              data={relatedMenus}
              renderItem={renderRelated}
              estimatedItemSize={120}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>

          <View style={{ height: 120 }} />

        </ScrollView>
        
        <CartBottomSheet ref={bottomSheetRef} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },

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
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },

  menuImage: {
    width: "100%",
    height: 260,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    borderRadius: 18,

    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
  },

  cardTitle: {
    fontSize: 17,
    marginBottom: 12,
    color: "#000",
    fontFamily:Fonts.bold
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  label: {
    fontSize: 15,
    color: "#555",
    fontFamily:Fonts.regular
  },
  price:{
    fontSize: 15,
    color: "#34C759",
    fontFamily:Fonts.semibold
  },

  value: {
    fontSize: 15,
    fontFamily:Fonts.semibold,
    color: "#000",
  },

  divider: {
    height: 0.7,
    backgroundColor: "#E2E3E5",
    marginVertical: 6,
  },

  descriptionText: {
    fontSize: 15,
    lineHeight: 21,
    color: "#444",
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily:Fonts.bold,
    marginLeft: 16,
    marginBottom: 12,
    color: "#000",
  },

  /* RELATED MENU ITEM */
  relatedCard: {
    width: 120,
    marginRight: 14,
  },
  relatedImage: {
    width: 120,
    height: 120,
    borderRadius: 14,
    marginBottom: 6,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  relatedPrice: {
    fontSize: 13,
    color: "#444",
  },

  /* FLOATING BUTTON */
  fab: {
    position: "absolute",
    right: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 30,
    boxShadow: "0px 4px 16px rgba(0,0,0,0.15)",
    flexDirection:'row',
    gap:8,
    alignItems:'center'
  },

  fabText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
