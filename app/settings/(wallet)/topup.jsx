import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AppleButton from '../../../components/Button-apple-custom';
import { Fonts } from '../../../constants/Fonts';

const TopUpScreen = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();

  const [timer, setTimer] = useState(300);

  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [showVA, setShowVA] = useState(false);
  const [vaNumber, setVaNumber] = useState('');

  const topupAmount = 50000
  const paymentFee = 4500


  const banks = [
    { id: 'bri', name: 'Bank BRI', logo: 'https://developers.bri.co.id/sites/default/files/inline-images/BRIVA-BRI.jpg' },
    { id: 'bni', name: 'Bank BNI', logo: 'https://dashboard.laznasdewandakwah.or.id/storage/galleries/2022/3/1646109122bni%20va%20kotak.png' },
  ];

  const processTopUp = () => {
    if (!amount || !selectedBank) return;
    // Generate dummy VA number
    const va = `${selectedBank.id.toUpperCase()}-${Math.floor(Math.random()*1000000)}`;
    setVaNumber(va);
    setShowVA(true);
  };

  useEffect(() => {
  let interval = null;
  if (showVA) {
    interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // opsional: otomatis cancel topup di frontend juga
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [showVA]);

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Up Wallet</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: inset.bottom + 20 }}>
        
        {!showVA && (
            <>
                {/* INPUT AMOUNT */}
                <View style={styles.card}>
                <Text style={styles.label}>Masukan Nominal Top-up</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Rp 50.000"
                    value={amount}
                    onChangeText={setAmount}
                />
                </View>

                {/* PILIH BANK */}
                <View style={styles.card}>
                <Text style={styles.label}>Pilih Bank VA</Text>
                {banks.map((bank) => (
                    <TouchableOpacity
                    key={bank.id}
                    style={[
                        styles.bankOption,
                        selectedBank?.id === bank.id && { borderColor: "#8A63F6", borderWidth: 2 }
                    ]}
                    onPress={() => setSelectedBank(bank)}
                    >
                    <Image source={{ uri: bank.logo }} style={styles.bankLogo} />
                    <Text style={styles.bankName}>{bank.name}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                <AppleButton 
                    title={"Proses Top-up"} 
                    onPress={processTopUp}
                    disabled={!amount || !selectedBank}
                    color={"#8A63F6"}
                    style={{
                    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                    opacity: amount && selectedBank ? 1 : 0.5
                    }}
                />
            </>
        )}

        {/* SHOW VA INFO */}
        {showVA && (
        <View style={[styles.card, { marginTop: 16 }]}>
            
            <Text style={styles.label}>Nomor Virtual Account</Text>

            {/* Wrapper VA */}
            <View style={styles.vaWrapper}>
            <Text style={styles.vaNumber}>{vaNumber}</Text>
            </View>

            {/* Instruksi Transfer */}
            <Text style={{ marginTop: 10, color: "#6C6C70", fontSize: 13 }}>
            Silahkan transfer ke nomor VA di atas melalui ATM / Mobile Banking {selectedBank.name}.
            Nominal transfer sudah otomatis sesuai total top-up.
            </Text>
            <Text style={{ marginTop: 4, color: "#6C6C70", fontSize: 13 }}>
            Jika tidak bisa memasukkan nominal manual, cukup lanjutkan pembayaran.
            </Text>

            {/* Rincian Pembayaran */}
            <View style={{ marginTop: 14 }}>
            <Text style={{ fontFamily: Fonts.semibold, color: "#1C1C1E", fontSize: 14 }}>
                Rincian Pembayaran Top-Up:
            </Text>

            {/* Top-Up Amount */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 8 }}>
                <Text style={{ color: "#6C6C70" }}>Nominal Top-Up</Text>
                <Text style={{ color: "#6C6C70" }}>Rp {topupAmount.toLocaleString("id-ID")}</Text>
            </View>

            {/* Fee */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 4 }}>
                <Text style={{ color: "#6C6C70" }}>Biaya Payment Gateway</Text>
                <Text style={{ color: "#6C6C70" }}>Rp {paymentFee.toLocaleString("id-ID")}</Text>
            </View>

            {/* Total */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 10 }}>
                <Text style={{ fontFamily: Fonts.semibold, color: "#1C1C1E" }}>
                Total Pembayaran
                </Text>
                <Text style={{ fontFamily: Fonts.semibold, color: "#34C759" }}>
                Rp {(topupAmount + paymentFee).toLocaleString("id-ID")}
                </Text>
            </View>
            </View>

            {/* Status + Timer */}
            <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
            <Text style={{ fontFamily: Fonts.semibold, color: '#FF3B30' }}>Status: Menunggu Pembayaran</Text>
            <Text style={{ fontFamily: Fonts.semibold, color: '#FF3B30' }}>
                {formatTime(timer)}
            </Text>
            </View>

        </View>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

export default TopUpScreen;

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
  label: {
    fontSize: 14,
    color: "#6C6C70",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    marginBottom: 10,
    gap: 12,
  },
  bankLogo: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  bankName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  processBtn: {
    backgroundColor: "#8A63F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  processBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  vaNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34C759",
    marginVertical: 6,
  },
  vaWrapper: {
    marginTop: 6,
    backgroundColor: "#F2F2F7", // abu-abu lembut
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    },
    vaNumber: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    color: "#000",
    },
});
