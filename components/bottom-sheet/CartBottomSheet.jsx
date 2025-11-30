import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AnimatePresence } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartStep from "./cart-step/Cart-step";
import Header from "./Header";
import LokasiStep from "./lokasi-step/Lokasi-step";
import PreviewOrder from "./preview-order/Preview-order";
import { BlurView } from "expo-blur";
import Noted from "./noted/Noted";



const CartBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["40%", "85%"], []);
  const [step, setStep] = useState(1);
  


  const [items, setItems] = useState([
    { id: 1, name: "Es Teh Manis", price: 12000, qty: 1, image: "https://placehold.co/80x80" },
    { id: 2, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    { id: 3, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 4, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 5, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 6, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 7, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 8, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 9, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
    // { id: 10, name: "Nasi Ayam Geprek", price: 25000, qty: 1, image: "https://placehold.co/80x80" },
  ]);

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

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <BottomSheetModal
      onDismiss={() => setStep(1)}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={({ style }) => (
        <Pressable
          onPress={() => ref.current?.dismiss()}
          style={[style, { flex: 1 }]}
        >
          <BlurView
            intensity={15}
            tint="dark" // opsi: "light" | "dark" | "default"
            experimentalBlurMethod='dimezisBlurView'
            style={[StyleSheet.absoluteFill, {backgroundColor:"rgba(0,0,0,0.20)"}]}
          />
            
        </Pressable>
      )}
      handleIndicatorStyle={{ backgroundColor: "#A9A9A9" }}
    >
        
        {/* HEADER */}
        <Header step={step} />

        {/* STEP CONTENT */}
        <AnimatePresence exitBeforeEnter>
          {/* STEP 1 — Cart */}
          {step === 1 && (
            <CartStep keystep={'step1'} items={items} total={total} onNext={() => setStep(2)}  onUpdateQty={updateQty}/>
          )}

          
          {/* STEP 2 - LOKASI */}
          {step === 2 && (
            <Noted keystep={'step2'} onNext={() => setStep(3)} onPrev={() => setStep(1)} />
          )}

          {/* STEP 3 - LOKASI */}
          {step === 3 && (
            <LokasiStep keystep={'step3'} onNext={() => setStep(4)} onPrev={() => setStep(2)} />
          )}

          {/* STEP 3 */}
          {step === 4 && (
              <PreviewOrder keystep={'step4'} total={total} items={items} onPrev={() => setStep(3)} />
          )}
        </AnimatePresence>

    </BottomSheetModal>
  );
});

export default CartBottomSheet;

