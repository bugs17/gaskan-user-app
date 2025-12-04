import { Feather } from "@expo/vector-icons";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle 
} from "react-native-reanimated";

export default function BrandButton({ title, onPress, style, badgeCount = 0 }) {
  const scale = useSharedValue(1);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[anim]}>
      <Pressable
        onPressIn={() => (scale.value = withTiming(0.96, { duration: 80 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
        onPress={onPress}
        style={[styles.button, style]}
      >
        <Text style={styles.text}>{title}</Text>

        {/* FLOATING BADGE */}
        {badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Feather name="shopping-bag" size={10} color="white" />
            <Text style={styles.badgeText}>
              {badgeCount > 99 ? "99+" : badgeCount}
            </Text>
          </View>
        )}

      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8A63F6",
    paddingVertical: 12,
    borderRadius: 14,

    /** Apple subtle purple glow */
    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  /** BADGE */
  badgeContainer: {
  position: "absolute",
  top: -8,
  right: -8,
  minWidth: 26,
  height: 26,
  borderRadius: 20,
  backgroundColor: "#FF3B30",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 4,
  gap: 2,

  boxShadow: "0px 4px 10px rgba(255, 59, 48, 0.45)",
},
badgeText: {
  color: "white",
  fontSize: 11,
  fontWeight: "bold",
},
});
