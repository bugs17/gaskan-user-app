import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { UserIcon, MapPinIcon,ChatBubbleLeftRightIcon,ClockIcon,ShieldCheckIcon, CreditCardIcon, GiftIcon, BellIcon, QuestionMarkCircleIcon, ArrowRightIcon, ArrowLeftOnRectangleIcon, DocumentTextIcon, PhoneIcon } from "react-native-heroicons/outline";
import ProfileImage from '../../assets/images/kurir-placeholder.png'
import FancyFloatingCart from "../../components/Floating-chart-button";
import { useSafePush } from "../../utils/useSafePush";
import FeedbackBottomSheet from "../../components/Bottomsheet-feedback";
import { useEffect, useRef, useState } from "react";
import { Fonts } from "../../constants/Fonts";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default function ProfileScreen() {
  const inset = useSafeAreaInsets()
  const push = useSafePush()
  const bottomSheetFeedBackRef = useRef(null);


  const scale = useSharedValue(1);
  const scale2 = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));

  

  useEffect(() => {
    bottomSheetFeedBackRef.current?.close()
  }, [])
  
  return (
    <SafeAreaView style={{flex:1}} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:inset.bottom + 100}} showsVerticalScrollIndicator={false}>

        {/* HEADER USER + WALLET */}
        <View style={styles.headerCard}>
          <Image
            source={ProfileImage}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            {/* Nama & Telepon */}
            <Text style={styles.userName}>Bugs Men</Text>
            <Text style={styles.userPhone}>+62 812 •••• ••••</Text>

            {/* Wallet */}
            <View style={styles.walletContainer}>
              <Text style={styles.walletLabel}>💰 Saldo:</Text>
              <Text style={styles.walletAmount}>Rp 150.000</Text>
            </View>

            {/* Tombol Topup & Withdraw */}
            <View style={styles.walletButtons}>
              <AnimatedTouchableOpacity 
                activeOpacity={.9} 
                style={[styles.walletBtn, animatedStyle]}
                onPressIn={() => (scale.value = withTiming(0.96, { duration: 80 }))}
                onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
                onPress={() =>  push('/settings/topup')}
                >
                <Text style={styles.walletBtnText}>💳 Topup</Text>
              </AnimatedTouchableOpacity>
              <AnimatedTouchableOpacity 
                activeOpacity={.9} 
                style={[styles.walletBtn, animatedStyle2]}
                onPressIn={() => (scale2.value = withTiming(0.96, { duration: 80 }))}
                onPressOut={() => (scale2.value = withTiming(1, { duration: 80 }))}
                onPress={() =>  push('/settings/withdraw')}
                >
                <Text style={styles.walletBtnText}>💸 Withdraw</Text>
              </AnimatedTouchableOpacity>
            </View>
          </View>
        </View>



        {/* GROUP 1 — ACCOUNT */}
        <View style={styles.groupCard}>
          <ProfileItem onPress={() => push('/settings')} icon={<UserIcon size={22} color="#3A3A3C" />} label="Edit Profil" />
          {/* <ProfileItem icon={<PhoneIcon size={22} color="#3A3A3C" />} label="Kelola Nomor Telepon" /> */}
        </View>

        {/* GROUP 2 — REWARDS */}
        <View style={styles.groupCard}>
          <ProfileItem onPress={() => bottomSheetFeedBackRef.current?.present()} icon={<DocumentTextIcon size={22} color="#3A3A3C" />} label="Umpan Balik (Feedback)" />
          <ProfileItem onPress={() => push('/settings/notifikasi')} icon={<BellIcon size={22} color="#3A3A3C" />} label="Notifikasi" />
        </View>

        <View style={styles.groupCard}>
          <ProfileItem onPress={() => {}} icon={<MapPinIcon size={22} color="#3A3A3C" />} label="Lokasi" />
        </View>

        {/* GROUP 3 — HELP */}
        <View style={styles.groupCard}>
          <ProfileItem onPress={() => push('/settings/riwayat-order')} label="Riwayat Order" icon={<ClockIcon size={22} color="#3A3A3C" />} />
          <ProfileItem onPress={() => push('/settings/riwayat-chat')} label="Riwayat Chat" icon={<ChatBubbleLeftRightIcon size={22} color="#3A3A3C" />} />
          <ProfileItem onPress={() => push('/settings/kebijakan-privasi')} label="Kebijakan & Privasi" icon={<ShieldCheckIcon size={22} color="#3A3A3C" />} />
          <ProfileItem onPress={() => push('/settings/pusat-bantuan')} label="Pusat Bantuan" icon={<QuestionMarkCircleIcon size={22} color="#3A3A3C" />} />
        </View>

        {/* LOGOUT */}
        <View style={styles.groupCard}>
          <ProfileItem
            icon={<ArrowLeftOnRectangleIcon size={22} color="#FF3B30" />}
            label="Keluar"
            labelStyle={{ color: "#FF3B30" }}
          />
        </View>
      </ScrollView>
      <FancyFloatingCart />
    <FeedbackBottomSheet ref={bottomSheetFeedBackRef}  />
    </SafeAreaView>
  );
}

const ProfileItem = ({ icon, label, labelStyle, onPress }) =>{
  const [lokasi, setLokasi] = useState(true)
  return(
          
          <TouchableOpacity onPress={onPress} style={styles.item}>
            <View style={styles.itemLeft}>
              {icon}
              <Text style={[styles.itemLabel, labelStyle]}>{label}</Text>
            </View>
            {label !== 'Lokasi' ? (
              <ArrowRightIcon size={18} color="#C7C7CC" />
            ):(
              <Switch
                value={lokasi}
                onValueChange={setLokasi}
                trackColor={{ false: "#ccc", true: "#8A63F6" }}
                thumbColor="#fff"
              />
            )}
          </TouchableOpacity>
        )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 16,
  },

  // HEADER (User Card)
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
    borderColor: "rgba(0,0,0,0.04)",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor:'#000'
  },
  userName: {
    fontSize: 18,
    color: "#1C1C1E",
    fontFamily:Fonts.semibold
  },
  userPhone: {
    fontSize: 14,
    color: "#6C6C70",
    marginTop: 2,
    fontFamily:Fonts.regular
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  walletLabel: {
    fontSize: 14,
    color: "#6C6C70",
    fontFamily:Fonts.semibold
  },
  walletAmount: {
    fontSize: 16,
    fontFamily: "System",
    color: "#34C759", // hijau apple style
    fontFamily:Fonts.semibold
  },
  walletButtons: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  walletBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#6C6C70", // abu netral Apple style
  },
  walletBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily:Fonts.semibold
  },


  // GROUPED CARD
  groupCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 20,
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
    borderColor: "rgba(0,0,0,0.04)",
  },

  // ITEM ROW
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.6,
    borderBottomColor: "#E5E5EA",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: "#1C1C1E",
    fontFamily:Fonts.regular
  },
});
