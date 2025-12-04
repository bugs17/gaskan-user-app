import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import EmptyIlustrator from '../assets/images/emptyman1.png';

const AnimatedCatDriver = () => {
  // Shared value untuk animasi vertical
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Animasi naik turun (bounce) berulang-ulang
    translateY.value = withRepeat(
      withTiming(-10, {
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1, // infinite repeat
      true // reverse direction
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.Image
    style={[styles.image, animatedStyle]}
        source={EmptyIlustrator}
    />
  );
};

export default AnimatedCatDriver;

const styles = StyleSheet.create({
  
  image: {
    height: 90,
    width: 90,
  },
  
});
