// ApplePulseBrand.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function ApplePulseBrand() {
  const rotate1 = useSharedValue(0);
  const rotate2 = useSharedValue(0);
  const rotate3 = useSharedValue(0);

  // Breath / scale
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);

  React.useEffect(() => {
    rotate1.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
    rotate2.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
    rotate3.value = withRepeat(
      withTiming(360, { duration: 9500, easing: Easing.linear }),
      -1,
      false
    );

    // Breath effect
    scale1.value = withRepeat(
      withTiming(1.15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    scale2.value = withRepeat(
      withTiming(1.12, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    scale3.value = withRepeat(
      withTiming(1.18, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const layer1 = useAnimatedStyle(() => ({
    transform: [
        { rotate: `${rotate1.value}deg` },
        { scale: scale1.value },
    ],
  }));

  const layer2 = useAnimatedStyle(() => ({
    transform: [
        { rotate: `${rotate2.value}deg` },
        { scale: scale2.value },
    ],
  }));

  const layer3 = useAnimatedStyle(() => ({
    transform: [
        { rotate: `${rotate3.value}deg` },
        { scale: scale3.value },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      {/* Deep brand purple → electric violet */}
      <Animated.View style={[styles.blob, layer1]}>
        <LinearGradient
          colors={["#8A63F6", "#B388FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Purple haze → bluish tint */}
      <Animated.View style={[styles.blob, layer2]}>
        <LinearGradient
          colors={["#6A4BEF", "#7FD4FF"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Purple → soft pink highlight (premium Apple vibe) */}
      <Animated.View style={[styles.blob, layer3]}>
        <LinearGradient
          colors={["#8A63F6", "#FF93D6"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const SIZE = 110;

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },

  blob: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    overflow: "hidden",

    /** Apple Glow — tuned for #8A63F6 + dark blur BG */
    boxShadow:
      "0px 0px 30px rgba(138, 99, 246, 0.45), 0px 0px 18px rgba(138, 99, 246, 0.25)",
  },

  gradient: {
    flex: 1,
  },
});
