// PlaceOrderOverlay.jsx
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { BlurView } from "expo-blur";
import { Easing } from "react-native-reanimated";
import { useRouter } from "expo-router";
import AnimatedTextReanimated from "./Shimmer-text";
import SlideToConfirm from "./Button-slide";
import ApplePulseBrand from "./AppleFluidLoader";

export default function PlaceOrderOverlay({ visible = false, onClose }) {
  const router = useRouter();
  const [status, setStatus] = useState("Mengirim orderan anda ke warung...");

  const [text, setText] = useState("Mohon menunggu sebentar, pesananmu sedang kami siapkan.");

  useEffect(() => {
    const words = ["Pesananmu sudah diterima warung dan akan segera dikirim.", "Mohon menunggu sebentar, pesananmu sedang kami siapkan."];
    let i = 0;
    const interval = setInterval(() => {
      setText(words[i % words.length]);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!visible) return;

    setStatus("Mengirim orderan anda ke warung...");

    // STEP 1 → 2 (dummy API)
    const id1 = setTimeout(() => {
      setStatus("Order berhasil dibuat!");
    }, 2000);

    // Close overlay + navigate
    const id2 = setTimeout(() => {
    //   onClose?.(); // setVisible(false)
    //   router.push("/(tabs)/pesan");
    }, 3500);

    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <MotiView
      style={styles.overlay}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "timing",
        duration: 350,
        easing: Easing.out(Easing.cubic),
      }}
    >
      <BlurView
        intensity={60}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(6, 6, 6, 0.76)" },
        ]}
      />

      <View style={styles.content}>
        {/* <PulseWaves color="#8A63F6" /> */}
        {/* <AppleFluidLoader color="#8A63F6" /> */}
        <View style={{flex:1, justifyContent:'flex-end'}}>
            <ApplePulseBrand />
            {/* <AnimatedCatDriver /> */}
        </View>

        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <AnimatedTextReanimated text={text} />
            </View>
            <View style={{flex:1}}>
                <SlideToConfirm label={'Geser untuk Batal'} onConfirm={() => Alert.alert("Status", "Berhasil dibatalkan!")} />
            </View>

        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap:40
  },
  statusText: {
    color: "#fff",
    marginTop: 28,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.95,
  },
});
