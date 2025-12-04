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
import { ArrowRightIcon } from "react-native-heroicons/outline";
import CartBottomSheet from "../../components/bottom-sheet/CartBottomSheet";
import AppleButton from "../../components/Button-apple-custom";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import {Fonts} from '../../constants/Fonts'
import { useSafePush } from "../../utils/useSafePush";
import { Feather } from "@expo/vector-icons";
import RelatedMenuCard from "../../components/Related-menu-card";
// Dummy related menu items
const relatedMenus = [
  {
    id: "m1",
    name: "Ayam Geprek Level 5",
    price: 18000,
    imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m2",
    name: "Nasi Goreng Special",
    price: 22000,
    imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m3",
    name: "Es Teh Manis",
    price: 5000,
    imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
];

export default function DetailMenuScreen() {
  const params = useLocalSearchParams();
  const router = useRouter()
  const push = useSafePush()
  const bottomSheetRef = useRef(null);

  const isItemInChart = true
  
  // reanimated
  const scale = useSharedValue(1);
  const scale2 = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
  }));



  const item = { id: '1', name: 'Nasi Goreng', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true }

  useEffect(() => {
    bottomSheetRef.current?.close()
  }, [])




  // const renderRelated = useCallback(({ item }) => (
  //   <Pressable style={styles.relatedCard}>
  //     <Image source={{ uri: item.imageUrl || "" }} style={styles.relatedImage} />
  //     <Text style={styles.relatedName} numberOfLines={1}>
  //       {item.name || "kosong"}
  //     </Text>
  //     <Text style={styles.relatedPrice}>Rp {item.price || 0}</Text>
  //   </Pressable>
  // ), []);

  const renderRelated = useCallback(({ item }) => (
    <RelatedMenuCard item={item} onPress={() => push({pathname:'/menu/' + 123})} />
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
                  onPress={() => push({pathname:'/warung/' + 123})}
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
              leftIcon={<ShoppingBag qty={isItemInChart ? 2 : 0} />} 
              title={isItemInChart ? "Lihat Keranjang" : "Tambah"} onPress={() => bottomSheetRef.current?.present()} 
              color={isItemInChart ? "#34C759" : "#8A63F6"}
              style={{
                boxShadow: isItemInChart
                ? "0px 6px 18px rgba(52, 199, 89, 0.28)"   // Apple green shadow
                : "0px 6px 18px rgba(138, 99, 246, 0.28)", // Purple brand shadow
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.18)",
                }}
              />
          </View>

          

          {/* RELATED MENUS */}
          <View style={{ marginTop: 6 }}>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:16, paddingRight: 16 * 2}}>
            <Text style={styles.sectionTitle}>Menu lainnya</Text>
            <Pressable
                  onPressIn={() => (scale2.value = withTiming(0.7, { duration: 80 }))}
                  onPressOut={() => (scale2.value = withTiming(1, { duration: 80 }))}
                  onPress={() => push({pathname:'/warung/' + 123})}
            >
              <Animated.View style={animatedStyle2}>
                <ArrowRightIcon size={20} color="#8E8E93" />
              </Animated.View>
            </Pressable>
          </View>

            <FlashList
              data={relatedMenus}
              renderItem={renderRelated}
              estimatedItemSize={120}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom:20 }}
            />
          </View>

          <View style={{ height: 120 }} />

        </ScrollView>
        
        <CartBottomSheet ref={bottomSheetRef} />
      </View>
    </SafeAreaView>
  );
}


function ShoppingBag({ size = 22, color = "white", qty = 0, style }) {
  return (
    <View style={[styles.wrapper, style]}>
      
      {/* Shopping Bag Icon */}
      <Feather name="shopping-bag" size={size} color={color} />

      {/* Badge */}
      {qty > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{qty}</Text>
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 10,

    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#34C759", // brand purple

    justifyContent: "center",
    alignItems: "center",

    // subtle shadow for glossy feel
    // boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#34C759",
  },

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
