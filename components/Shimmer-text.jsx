// AnimatedTextReanimated.jsx
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import { Fonts } from "../constants/Fonts";

export default function AnimatedTextReanimated({ text, style }) {
  const opacity = useSharedValue(1);
  const displayedText = React.useRef(text);
  const [, setVersion] = React.useState(0); // untuk re-render saat text berubah

  useEffect(() => {
    if (displayedText.current === text) return;

    // sequence: fade out → ganti text → fade in
    opacity.value = withSequence(
      withTiming(0, { duration: 300 }),
      withTiming(1, { duration: 500 })
    );

    // ganti text saat opacity 0
    const timeout = setTimeout(() => {
      displayedText.current = text;
      setVersion((v) => v + 1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [text]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Text style={[styles.text, style]}>{displayedText.current}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // minHeight: 30, // container tetap
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: Fonts.bold,
  },
});
