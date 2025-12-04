import { View, Text, Pressable, StyleSheet, Alert, Vibration } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import AppleButton from "../../Button-apple-custom";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { Fonts } from "../../../constants/Fonts";

const PaymentMethod = ({ keystep, saldo = 0, onNext, onPrev, total, ongkir= 8000 }) => {
  const [selected, setSelected] = useState("cash");

  // untuk shake
  const [shake, setShake] = useState(false);

  const options = [
    { id: "cash", label: "Bayar Cash", desc: "Bayar langsung ke driver" },
    {
      id: "gaskan",
      label: "Saldo Gaskan",
      desc: `Saldo tersedia: Rp ${saldo.toLocaleString("id-ID")}`,
    },
  ];


  const handleNext = () => {
    const grandTotal = total + ongkir
    if (selected === "gaskan" && saldo < grandTotal) {
      // 🔥 Jalankan shake sekali
      setShake(true);
      setTimeout(() => setShake(false), 150);

      return;
    }

    onNext();
  };

  return (
    <BottomSheetView style={[styles.container, { marginTop: 50 }]}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
        transition={{ type: "timing", duration: 220 }}
      >
        {/* TOTAL SECTION */}
        <View style={{  }}>
          

          <View style={styles.totalBox}>
            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>Total Makanan</Text>
              <Text style={styles.totalValue}>Rp {total.toLocaleString("id-ID")}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>Ongkir</Text>
              <Text style={styles.totalValue}>Rp {ongkir.toLocaleString("id-ID")}</Text>
            </View>

            <View style={[styles.rowBetween, { marginTop: 8 }]}>
              <Text style={styles.grandLabel}>Grand Total</Text>
              <Text style={styles.grandValue}>
                Rp {(total + ongkir).toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </View>

        {/* LIST */}
        <View style={{ marginTop: 10, gap: 12 }}>
          {options.map((opt) => {
            const active = selected === opt.id;

            return (
              <MotiView
                key={opt.id}
                animate={
                    shake && opt.id === "gaskan"
                    ? {
                        translateX: [-6, 6, -4, 4, -2, 2, 0],
                        }
                    : { translateX: 0 }
                }
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                    mass: 0.3,
                    duration: 350,
                }}
                
              >
                <Pressable
                  onPress={() => setSelected(opt.id)}
                  style={({ pressed }) => [
                    styles.card,
                    active && styles.cardActive,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  {/* RADIO */}
                  <View style={styles.radioOuter}>
                    <AnimatePresence>
                      {active && (
                        <MotiView
                          key="dot"
                          from={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "timing", duration: 180 }}
                          style={styles.radioInner}
                        />
                      )}
                    </AnimatePresence>
                  </View>

                  {/* TEXT */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{opt.label}</Text>
                    <Text style={styles.desc}>{opt.desc}</Text>

                    {/* 🔥 Badge SALDO TIDAK CUKUP */}
                    {opt.id === "gaskan" && saldo < total && selected === "gaskan" && (
                      <View
                        style={{
                          marginTop: 6,
                          alignSelf: "flex-start",
                          backgroundColor: "#FF3B30",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 8,
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 12, fontFamily:Fonts.semibold }}>
                          Saldo tidak cukup
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              </MotiView>
            );
          })}
        </View>

        {/* BUTTON */}
        <View style={styles.footer}>
          <AppleButton
            title="Lanjut"
            onPress={handleNext}
            style={{
                  boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.18)",
              }}
          />

          <AppleButton
            color="#F2F2F7"
            textStyle={{ color: "#000" }}
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.08)",
              boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)",
            }}
            title="Kembali"
            onPress={onPrev}
            leftIcon={<ArrowLeftIcon size={12} color={"#8E8E93"} />}
          />
        </View>
      </MotiView>
    </BottomSheetView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: { padding: 20 },

  title: {
    fontSize: 22,
    marginBottom: 10,
    color: "#000",
    fontFamily: Fonts.bold
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    gap: 14,
  },

  cardActive: {
    borderColor: "#8A63F6",
    backgroundColor: "#ECE7FF",
    shadowColor: "#8A63F6",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },

  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8A63F6",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8A63F6",
  },

  label: {
    fontSize: 16,
    color: "#000",
    fontFamily:Fonts.bold
  },

  desc: {
    marginTop: 2,
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
  },
  footer: {
    marginTop: 20,
    gap: 12,
  },
  totalBox: {
  backgroundColor: "#F2F2F7",
  padding: 16,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.08)",
  marginBottom: 10,
},

rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 4,
},

totalLabel: {
  fontSize: 14,
  color: "#000",
},

totalValue: {
  fontSize: 14,
  color: "#000",
  fontFamily:Fonts.bold
},

grandLabel: {
  fontSize: 16,
  color: "#000",
  fontFamily:Fonts.bold
},

grandValue: {
  fontSize: 16,
  color: "#34C759",
  fontFamily:Fonts.bold
},
});
