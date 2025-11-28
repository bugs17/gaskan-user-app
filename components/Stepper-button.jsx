import { StyleSheet, Text, View, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


// Ubah Pressable jadi Animated component
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StepperButton = ({children, onPress}) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    }));
    
  return (
    <AnimatedPressable
      style={[styles.stepButton, animatedStyle]}
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.9, { duration: 80 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 80 });
      }}
    >
      <Text style={styles.stepButtonText}>{children}</Text>
    </AnimatedPressable>
  )
}

export default StepperButton

const styles = StyleSheet.create({
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
})