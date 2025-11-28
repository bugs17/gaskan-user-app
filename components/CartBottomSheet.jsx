import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import { Text, Pressable, View, StyleSheet, Image, ScrollView } from "react-native";
import AppleButton from "./Button-apple-custom";
import StepperButton from "./Stepper-button";
import NumberAnimation from "./Number-animation-gpt";
import { Fonts } from "../constants/Fonts";



const CartBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["40%", "75%"], []);


  // Dummy data menu
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Es Teh Manis",
      price: 12000,
      qty: 1,
      image: "https://placehold.co/80x80",
    },
    {
      id: 2,
      name: "Nasi Ayam Geprek",
      price: 25000,
      qty: 1,
      image: "https://placehold.co/80x80",
    },
  ]);

  // Update quantity
  const updateQty = (id, type) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // Total price calculation
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={({ animatedIndex, style }) => (
        <Pressable
          onPress={() => ref.current.dismiss()}
          style={[style, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        />
      )}
      handleIndicatorStyle={{ backgroundColor: "#A9A9A9" }}
    >
      <BottomSheetView style={styles.container}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Keranjang</Text>

          <Pressable onPress={() => ref.current?.dismiss()} style={styles.closeBtn}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              
              {/* Image */}
              <Image style={styles.itemImage} source={{ uri: item.image }} />

              {/* Info */}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rp {item.price.toLocaleString("id-ID")}</Text>
              </View>

              {/* Stepper */}
              <View style={styles.stepper}>
                
                <StepperButton onPress={() => updateQty(item.id, "dec")}>-</StepperButton>

                <NumberAnimation value={item.qty} fontSize={16} />

                <StepperButton onPress={() => updateQty(item.id, "inc")}>+</StepperButton>
              </View>

            </View>
          ))}
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <NumberAnimation value={total.toLocaleString('Id')} fontSize={18} prefix="Rp " color="#34C759"/>
            {/* <Text style={styles.totalPrice}>Rp {total.toLocaleString("id-ID")}</Text> */}
          </View>

          <AppleButton style={{borderWidth: 1, borderColor: "rgba(138, 99, 246, 0.35)",}} title={"Pesan Sekarang"} onPress={() => {}} />
          <AppleButton color="#F2F2F7"  textStyle={{color: "#000", fontSize: 16, fontWeight: "500"}} style={{boxShadow: "0px 4px 12px rgba(0,0,0,0.12)", borderWidth: 1, borderColor: "rgba(0,0,0,0.08)",}} title={"Tambah menu lagi"} onPress={() => {}} />

          {/* <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Tambah menu lagi</Text>
          </Pressable> */}
        </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CartBottomSheet;

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16, flex: 1 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  title: { fontSize: 20, fontWeight: "600", color: "#000" },

  closeBtn: { 
    height:40, 
    width:40, 
    borderRadius: 40 / 2, 
    backgroundColor:'#F2F2F7', 
    justifyContent:'center', 
    alignItems:'center',
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.28)",
    borderWidth:1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  closeText: { fontSize: 15, color: "#000", fontFamily:Fonts.regular },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    
  },

  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  itemName: { fontSize: 16, fontWeight: "500", color: "#222" },

  itemPrice: { marginTop: 4, fontSize: 14, color: "#6C6C70" },

  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },

  stepButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  stepButtonText: { fontSize: 18, color: "#000" },

  qtyText: { fontSize: 16, fontWeight: "600", width: 20, textAlign: "center" },

  footer: { marginTop: 10, gap: 12 },

  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },

  totalLabel: { fontSize: 16, color: "#444" },

  totalPrice: { fontSize: 17, fontWeight: "600", color: "#000" },

});
