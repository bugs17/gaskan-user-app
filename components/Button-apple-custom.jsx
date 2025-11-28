import { Pressable, Text, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AppleButton({
  title,
  onPress,
  style,        // custom style utk container
  textStyle,    // custom style utk text
  color = "#8A63F6",
  leftIcon,     // <Icon /> component
  rightIcon,    // <Icon /> component
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withTiming(0.96, { duration: 80 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
      onPress={onPress}
      style={[{ width: "100%" }]}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: color, shadowColor: color },
          animatedStyle,
          style
        ]}
      >
        <View style={styles.contentWrapper}>
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

          <Text style={[styles.label, textStyle]}>
            {title}
          </Text>

          {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    
    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
  },

  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",   // text tetap center meskipun ada icon
    paddingHorizontal: 14,
  },

  iconLeft: {
    marginRight: 8,
  },

  iconRight: {
    marginLeft: 8,
  },

  label: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
