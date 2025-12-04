import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { UserIcon, MapPinIcon,ChatBubbleLeftRightIcon,ClockIcon,ShieldCheckIcon, CreditCardIcon, GiftIcon, BellIcon, QuestionMarkCircleIcon, ArrowRightIcon, ArrowLeftOnRectangleIcon, DocumentTextIcon, PhoneIcon } from "react-native-heroicons/outline";
import ProfileImage from '../../assets/images/kurir-placeholder.png'
import FancyFloatingCart from "../../components/Floating-chart-button";
import { useSafePush } from "../../utils/useSafePush";
import FeedbackBottomSheet from "../../components/Bottomsheet-feedback";
import { useEffect, useRef } from "react";

export default function ProfileScreen() {
  const inset = useSafeAreaInsets()
  const push = useSafePush()
  const bottomSheetFeedBackRef = useRef(null);

  useEffect(() => {
    bottomSheetFeedBackRef.current?.close()
  }, [])
  
  return (
    <SafeAreaView style={{flex:1}} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:inset.bottom + 100}} showsVerticalScrollIndicator={false}>

        {/* HEADER USER */}
        <View style={styles.headerCard}>
          <Image
            source={ProfileImage}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Bugs Men</Text>
            <Text style={styles.userPhone}>+62 812 •••• ••••</Text>
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

        {/* GROUP 3 — HELP */}
        <View style={styles.groupCard}>
          <ProfileItem  label="Riwayat Pesanan" icon={<ClockIcon size={22} color="#3A3A3C" />} />
          <ProfileItem onPress={() => push('/settings/riwayat-chat')} label="Riwayat Chat" icon={<ChatBubbleLeftRightIcon size={22} color="#3A3A3C" />} />
          <ProfileItem label="Kebijakan & Privasi" icon={<ShieldCheckIcon size={22} color="#3A3A3C" />} />
          <ProfileItem label="Pusat Bantuan" icon={<QuestionMarkCircleIcon size={22} color="#3A3A3C" />} />
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

const ProfileItem = ({ icon, label, labelStyle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={[styles.itemLabel, labelStyle]}>{label}</Text>
    </View>
    <ArrowRightIcon size={18} color="#C7C7CC" />
  </TouchableOpacity>
);

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
    fontWeight: "600",
    color: "#1C1C1E",
  },
  userPhone: {
    fontSize: 14,
    color: "#6C6C70",
    marginTop: 2,
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
  },
});
