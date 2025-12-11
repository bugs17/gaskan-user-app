import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AppleButton from '../../../../components/Button-apple-custom';
import { Fonts } from '../../../../constants/Fonts';

const WithdrawScreen = () => {
    const router = useRouter();
    const inset = useSafeAreaInsets();

    const [amount, setAmount] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [showStatus, setShowStatus] = useState(false);

    const [isBankAccountExist, setIsBankAccountExist] = useState(false);

    // STATE FORM REKENING BARU
    const [selectedBank, setSelectedBank] = useState(null);
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const saveBankAccount = () => {
    if (!selectedBank || !accountName || !accountNumber) {
        alert("Mohon lengkapi data rekening!");
        return;
    }

    // Simulasi berhasil simpan
    setIsBankAccountExist(true);
    alert("Rekening berhasil disimpan!");
    };

  const balance = 250000; // contoh saldo user, nanti dari backend
  const minWithdraw = 50000;
  const withdrawFee = 2500;

  const formattedAmount = amount ? parseInt(amount.replace(/\D/g, "")) || 0 : 0;

  const handleAmountChange = (val) => {
    const cleanVal = val.replace(/\D/g, "");
    setAmount(cleanVal);

    const amountVal = parseInt(cleanVal || "0");

    if (amountVal < minWithdraw) {
      setError(`Minimal penarikan Rp ${minWithdraw.toLocaleString("id-ID")}`);
    } else if (amountVal > balance) {
      setError("Nominal melebihi saldo Anda");
    } else {
      setError(null);
    }
  };

  const processWithdraw = () => {
    if (error || formattedAmount < minWithdraw) return;
    setShowStatus(true)
    setProcessing(true);
    setTimeout(() => {
      alert("Withdraw request submitted!");
      setProcessing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F7" }} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw Wallet</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: inset.bottom + 20 }}>

        {!showStatus && isBankAccountExist && (
            <>
                {/* SALDO SAAT INI */}
                <View style={styles.card}>
                <Text style={styles.label}>Saldo Saat Ini</Text>
                <Text style={styles.balanceValue}>
                    Rp {balance.toLocaleString("id-ID")}
                </Text>
                </View>

                {/* INPUT NOMINAL */}
                <View style={styles.card}>
                <Text style={styles.label}>Masukkan Nominal Withdraw</Text>

                <View style={styles.inputWrapper}>
                    <Text style={styles.rp}>Rp</Text>
                    <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={amount}
                    onChangeText={handleAmountChange}
                    placeholder="50.000"
                    placeholderTextColor="#A0A0A0"
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
                </View>

                {/* TUJUAN REKENING */}
                <View style={styles.card}>
                <Text style={styles.label}>Tujuan Pencairan</Text>

                <View style={styles.bankBox}>
                    <Image
                    source={{ uri: "https://dashboard.laznasdewandakwah.or.id/storage/galleries/2022/3/1646109122bni%20va%20kotak.png" }}
                    style={styles.bankLogo}
                    />

                    <View>
                    <Text style={styles.bankName}>Bank BNI</Text>
                    <Text style={styles.accName}>Roni Siahaan</Text>
                    <Text style={styles.accNumber}>1234 5678 9900</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={styles.changeAccount}>
                    Ganti rekening &gt;
                    </Text>
                </TouchableOpacity>
                </View>

                {/* DETAIL WITHDRAW */}
                {formattedAmount >= minWithdraw && !error && (
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Detail Penarikan</Text>

                    <View style={styles.row}>
                    <Text style={styles.grayText}>Nominal</Text>
                    <Text style={styles.grayText}>Rp {formattedAmount.toLocaleString("id-ID")}</Text>
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.grayText}>Biaya Withdraw</Text>
                    <Text style={styles.grayText}>Rp {withdrawFee.toLocaleString("id-ID")}</Text>
                    </View>

                    <View style={[styles.row, { marginTop: 8 }]}>
                    <Text style={[styles.subHeader, { fontSize: 15 }]}>Total diterima</Text>
                    <Text style={[styles.subHeader, { color: "#34C759", fontSize: 15 }]}>
                        Rp {(formattedAmount - withdrawFee).toLocaleString("id-ID")}
                    </Text>
                    </View>
                </View>
                )}

                {/* BUTTON */}
                <AppleButton
                title={processing ? "Memproses..." : "Tarik Dana"}
                onPress={processWithdraw}
                disabled={!!(!formattedAmount || error)}
                color={"#8A63F6"}
                style={{
                    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                    opacity: !formattedAmount || error ? 0.5 : 1,
                    marginTop: 12
                }}
                />
            </>
        )}

        {/* WITHDRAW SUMMARY CARD */}
        {showStatus && isBankAccountExist && (
            <View style={[styles.card, { marginTop: 16 }]}>
                <Text style={styles.subHeader}>Detail Penarikan</Text>

                <View style={styles.row}>
                <Text style={styles.grayText}>Nominal</Text>
                <Text style={styles.grayText}>Rp {formattedAmount.toLocaleString("id-ID")}</Text>
                </View>

                <View style={styles.row}>
                <Text style={styles.grayText}>Biaya Withdraw</Text>
                <Text style={styles.grayText}>Rp {withdrawFee.toLocaleString("id-ID")}</Text>
                </View>

                <View style={[styles.row, { marginTop: 8 }]}>
                <Text style={[styles.subHeader, { fontSize: 15 }]}>Total diterima</Text>
                <Text style={[styles.subHeader, { color: "#34C759", fontSize: 15 }]}>
                    Rp {(formattedAmount - withdrawFee).toLocaleString("id-ID")}
                </Text>
                </View>

                <View style={{ marginTop: 14 }}>
                <Text style={styles.grayText}>Tujuan Pencairan:</Text>
                <Text style={[styles.bankName, { fontSize: 14, marginTop: 4 }]}>BNI</Text>
                <Text style={styles.accName}>Roni Siahaan</Text>
                <Text style={styles.accNumber}>1234 5678 9900</Text>
                </View>

                {/* Status Badge */}
                <View style={styles.badge}>
                <Text style={styles.badgeText}>Sedang Diproses</Text>
                </View>
            </View>
        )}

        {!isBankAccountExist && (
            <View style={styles.card}>
                <Text style={styles.label}>
                🚫 Anda belum menambahkan rekening tujuan withdraw
                </Text>

                {/* PILIHAN BANK */}
                <Text style={[styles.subHeader, { marginTop: 12 }]}>Pilih Bank</Text>

                <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
                {/* BANK BNI */}
                <TouchableOpacity
                    onPress={() => setSelectedBank("BNI")}
                    style={[
                    styles.bankOption,
                    selectedBank === "BNI" && styles.bankOptionSelected
                    ]}
                >
                    <Text style={{ color: selectedBank === "BNI" ? "#fff" : "#000" }}>
                    BNI
                    </Text>
                </TouchableOpacity>

                {/* BANK BRI */}
                <TouchableOpacity
                    onPress={() => setSelectedBank("BRI")}
                    style={[
                    styles.bankOption,
                    selectedBank === "BRI" && styles.bankOptionSelected
                    ]}
                >
                    <Text style={{ color: selectedBank === "BRI" ? "#fff" : "#000" }}>
                    BRI
                    </Text>
                </TouchableOpacity>
                </View>

                {/* INPUT NAMA PEMILIK */}
                <TextInput
                style={[styles.input, { marginTop: 12 }]}
                placeholder="Nama Pemilik Rekening"
                value={accountName}
                onChangeText={setAccountName}
                />

                {/* INPUT NOMOR REKENING */}
                <TextInput
                style={[styles.input, { marginTop: 12 }]}
                placeholder="Nomor Rekening"
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={setAccountNumber}
                />

                {/* INFO SUPPORT BANK */}
                <Text style={{ fontSize: 12, color: "#FF3B30", marginTop: 8 }}>
                Saat ini kami hanya mendukung BNI & BRI
                </Text>

                {/* BUTTON SIMPAN */}
                <AppleButton
                title="Simpan Rekening"
                onPress={saveBankAccount}
                color={"#8A63F6"}
                style={{
                    marginTop: 14,
                    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                    opacity: selectedBank && accountName && accountNumber ? 1 : 0.5,
                }}
                disabled={!selectedBank || !accountName || !accountNumber}
                />

            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({
  // --- (tidak berubah dari kode kamu) ---
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
    fontWeight: "500",
    marginBottom: 8,
  },
  balanceValue: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: "#34C759",
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rp: {
    fontWeight: "600",
    marginRight: 6,
    color: "#000",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 8,
  },
  bankBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  bankLogo: {
    width: 55,
    height: 35,
    resizeMode: "contain",
  },
  bankName: {
    color: "#1C1C1E",
    fontFamily: Fonts.semibold,
    fontSize: 15,
  },
  accName: {
    color: "#6C6C70",
    fontSize: 13,
    marginTop: 4,
  },
  accNumber: {
    color: "#6C6C70",
    fontSize: 13,
  },
  changeAccount: {
    color: "#8A63F6",
    fontSize: 13,
    marginTop: 4,
  },
  subHeader: {
    fontFamily: Fonts.semibold,
    color: "#1C1C1E",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  grayText: {
    color: "#6C6C70",
    fontSize: 14,
  },
  badge: {
    backgroundColor: "rgba(52, 199, 89, 0.15)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    marginTop: 18,
    },
badgeText: {
fontFamily: Fonts.semibold,
fontSize: 12,
color: "#34C759",
},
bankOption: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E5E5EA",
  justifyContent: "center",
  alignItems: "center"
},
bankOptionSelected: {
  backgroundColor: "#8A63F6",
  borderColor: "#8A63F6"
},
});
