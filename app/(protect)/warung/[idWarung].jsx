// app/warung/[idWarung].jsx
import { useState, useMemo } from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BrandButton from "../../../components/Brand-button";
import { useSafePush } from "../../../utils/useSafePush";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { Fonts } from "../../../constants/Fonts";
import CategoriesButtonWarungScreen from "../../../components/Category-button-warung-screen";
import { AnimatedFlashList } from "@shopify/flash-list";
import FancyFloatingCart from "../../../components/Floating-chart-button";
import LokasiWarung from "../../../components/map/lokasi-warung";


// Dummy data warung
const warungDummy = {
  id: "1",
  name: "Warung Sederhana Bu Tini",
  photo:
    "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
};

// Dummy menu per kategori
const menuDummy = [
  {
    id: "m1",
    kategori: "Makanan",
    name: "Nasi Goreng",
    price: 18000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m2",
    kategori: "Makanan",
    name: "Ayam Geprek",
    price: 20000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m3",
    kategori: "Minuman",
    name: "Es Teh Manis",
    price: 5000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m4",
    kategori: "Cemilan",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m5",
    kategori: "Minuman",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m6",
    kategori: "Minuman",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m7",
    kategori: "Minuman",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m8",
    kategori: "Minuman",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
  {
    id: "m9",
    kategori: "Minuman",
    name: "Tempe Goreng",
    price: 7000,
    photo: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp",
  },
];
const categories = ['Makanan', 'Minuman', 'Cemilan', 'Lokasi'];

export default function WarungMenuScreen() {
    const { idWarung } = useLocalSearchParams();
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const inset = useSafeAreaInsets()
    const router = useRouter()
    

    const push = useSafePush()

    // Filter menu berdasarkan kategori
    const filteredMenu = useMemo(() => {
        return menuDummy.filter((item) => item.kategori === activeCategory);
    }, [activeCategory]);


    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));


        

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" />

            {/* header image cover and back button */}
            <View style={{width: "100%",height: 180 + inset.top,backgroundColor:'red', marginTop:-inset.top}}>
                <Pressable
                        style={{position:'absolute', left:16, top:inset.top + 10, zIndex:999}}
                        onPressIn={() => (scale.value = withTiming(0.7, { duration: 80 }))}
                        onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
                        onPress={() => router.back()}
                >
                    <Animated.View style={animatedStyle}>
                        <ArrowLeftIcon size={25} color="#fff" />
                    </Animated.View>
                </Pressable>
            {/* Foto Warung */}
            <Image source={{ uri: warungDummy.photo }} style={styles.cover} resizeMode="cover"/>
            </View>

            {/* Nama Warung */}
            <Text style={styles.title}>{warungDummy.name}</Text>


            <ScrollView contentContainerStyle={{paddingHorizontal: 16}} horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                <CategoriesButtonWarungScreen onPress={setActiveCategory} categories={categories} />
            </ScrollView>
            {/* Menu List */}
            {activeCategory !== 'Lokasi' ? (
              <AnimatedFlashList
              data={filteredMenu}
              keyExtractor={(item) => item.id}
              estimatedItemSize={110} // estimasi tinggi sel
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: inset.bottom + 80 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                  <AnimatedMenuItem
                  item={item}
                  index={index}
                  onPress={() => push(`/menu/${item.id}`)}
                  qty={0}
                  />
              )}
              />
            ):(
              <LokasiWarung coordinate={[140.330025, -6.092943]} />
            )}
        <FancyFloatingCart />
        </SafeAreaView>

    );
}


const AnimatedMenuItem = ({ item, index, onPress, qty = 0 }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        index * 5000,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
      ),
      transform: [
        {
          scale: withDelay(
            index * 5000,
            withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) })
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[{ opacity: 0, transform: [{ scale: 0.9 }] }, animatedStyle]}>
      <Pressable style={styles.menuCard} onPress={onPress}>
        <Image source={{ uri: item.photo }} style={styles.menuImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuPrice}>
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
        </View>
        <BrandButton
          title="Tambah"
          style={{ marginLeft: 8, width: 90}}
          onPress={(e) => {
            e.stopPropagation();
            console.log("Tambah ke cart");
          }}
          badgeCount={qty}
        />
      </Pressable>
    </Animated.View>
  );
};


// ------------------------- STYLE -------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    marginTop: 12,
    marginHorizontal: 16,
    fontFamily:Fonts.bold
  },

  categoryScroll: {
    maxHeight:60
  },
  

  menuList: {
    paddingTop:12
  },
  // ---------------------- APPLE STYLE CARD ---------------------
menuCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",

    // Apple soft shadow
    boxShadow: "0px 6px 18px rgba(0,0,0,0.10)",
},

    menuImage: {
        width: 78,
        height: 78,
        borderRadius: 16,
        marginRight: 14,
    },

    menuName: {
        fontSize: 17,
        color: "#111",
        fontFamily:Fonts.bold
    },

    menuPrice: {
        marginTop: 3,
        fontSize: 15,
        color: "#555",
        fontFamily:Fonts.semibold
    },

});
