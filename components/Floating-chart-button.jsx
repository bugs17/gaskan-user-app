import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Fonts } from "../constants/Fonts";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function FancyFloatingCart({onCartPres, onCanclePres}) {
  const items = 0;
  const inset = useSafeAreaInsets();

  if (items < 1) return null;

  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    
  }));

  return (
    <View style={[styles.container, { bottom: inset.bottom + 13 }]}>
      <View style={styles.deck}>

        {/* CART BUTTON */}
        <AnimatedPressable 
         onPressIn={() => (scale1.value = withTiming(0.96, { duration: 80}))}
         onPressOut={() => (scale1.value = withTiming(1, { duration: 80 }))}
         onPress={onCartPres}
         style={[styles.button, styles.primaryButton, animatedStyle1]}>
          <View style={styles.cartRow}>
            <View style={styles.iconWrapper}>
              <Feather name="shopping-bag" size={20} color="white" />

              {/* BADGE */}
              {items > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{items}</Text>
                </View>
              )}
            </View>

            <Text style={styles.primaryText}>Cart</Text>
          </View>
        </AnimatedPressable>

        {/* CANCEL BUTTON */}
        <AnimatedPressable 
          onPressIn={() => (scale2.value = withTiming(0.96, { duration: 80 }))}
          onPressOut={() => (scale2.value = withTiming(1, { duration: 80 }))}
          style={[styles.button, styles.cancelButton, animatedStyle2]}>
          <Text style={styles.cancelText}>Cancel</Text>
        </AnimatedPressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 999,
  },

  /** Dark Deck */
  deck: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 28,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    boxShadow: "0px 8px 22px rgba(0,0,0,0.55)",
  },

  button: {
    flex: 1,
    paddingVertical: 13,
    marginHorizontal: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  /** Purple button */
  primaryButton: {
    flex: 1,
    backgroundColor: "#8A63F6",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  /** Dark cancel button */
  cancelButton: {
    backgroundColor: "#3A3A3A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },

  /** Cart button row */
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /** wrapper icon (untuk posisi badge) */
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  /** Badge kecil yang Apple banget */
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",

    /** purple border biar lebih brandy & clean */
    borderWidth: 2,
    borderColor: "#8A63F6",
  },

  badgeText: {
    color: "#8A63F6",
    fontSize: 11,
    fontWeight: "700",
  },

  primaryText: {
    color: "white",
    fontSize: 16,
    fontFamily:Fonts.bold
  },

  cancelText: {
    color: "#FF453A",
    fontWeight: "600",
    fontSize: 15,
  },
});
