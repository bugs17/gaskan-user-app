import { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MotiText, AnimatePresence, MotiView } from "moti";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import AppleButton from "../../Button-apple-custom";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const placeholderList = [
  "Tolong sambalnya dipisah ya 🥵",
  "Tolong minta sendok ya 🥄",
  "Kalau bisa nasinya sedikit ya 🍚",
  "Boleh lebihkan kuahnya ya 🍲",
];

export default function Noted({ value, onChangeText, style, keystep, onNext, onPrev }) {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  const isEmpty = !value || value.length === 0;
  const shouldShowPlaceholder = isEmpty && !focused;

  // Rotate placeholder every 3 seconds
  useEffect(() => {
    if (!shouldShowPlaceholder) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % placeholderList.length);
    }, 3000);

    return () => clearInterval(t);
  }, [shouldShowPlaceholder]);

  return (
    <BottomSheetView style={[styles.container, {marginTop:50}]}>
      <MotiView
        key={keystep}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -10 }}
        transition={{ type: "timing", duration: 220 }}
      >
        <View style={[styles.wrapper, style]}>
          {/* SMOOTH PLACEHOLDER */}
          <AnimatePresence>
            {shouldShowPlaceholder && (
              <MotiText
                key={`ph-${index}`}
                from={{ opacity: 0, translateY: 6 }}
                animate={{ opacity: 0.45, translateY: 0 }}
                exit={{ opacity: 0, translateY: -6 }}
                transition={{ type: "timing", duration: 350 }}
                style={styles.placeholder}
              >
                {placeholderList[index]}
              </MotiText>
            )}
          </AnimatePresence>

          {/* INPUT */}
          <BottomSheetTextInput
            multiline
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.footer}>
            <AppleButton 
                title="Lanjut" onPress={onNext}
                style={{boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)"}}
            />

            <AppleButton
                color="#F2F2F7"
                textStyle={{ color: "#000" }}
                style={{ borderWidth: 1, borderColor: "rgba(0,0,0,0.08)", boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)" }}
                title="Kembali"
                onPress={onPrev}
                leftIcon={<ArrowLeftIcon size={12} color={'#8E8E93'} />}
            />
        </View>
      </MotiView>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  wrapper: {
    minHeight: 120,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  textInput: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,

    fontSize: 16,
    color: "#000",

    padding: 0,
    margin: 0,
    textAlignVertical: "top",
  },

  placeholder: {
    position: "absolute",
    top: 14,
    left: 14,
    fontSize: 16,
    color: "rgba(0,0,0,0.4)",
  },
  footer: { 
        marginTop: 20,
        gap: 12
    },
});
