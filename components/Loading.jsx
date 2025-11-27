import  { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from "react-native-reanimated";

/**
 * PulseWaves
 * props:
 *  - size: diameter of center (number) default 80
 *  - color: base color of waves (string) default '#4B6BFF'
 *  - waves: number of concentric waves (int) default 3
 *  - duration: duration of one wave cycle in ms (number) default 1500
 *  - maxScale: how big wave grows relative to center (number) default 3
 *  - style: extra container style
 *  - children: optional center content
 */
export default function PulseWaves({
  size = 80,
  color = "#4B6BFF",
  waves = 4,
  duration = 1600,
  maxScale = 2.6,
  style,
  children,
}) {
  // create shared values for each wave
  const sv = Array.from({ length: waves }).map(() => useSharedValue(0));

  useEffect(() => {
    // start animation for each wave with staggered delays
    sv.forEach((shared, i) => {
      const delay = (i * duration) / waves; // stagger evenly
      // animate 0 -> 1, then jump back and repeat forever
      shared.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration,
            easing: Easing.out(Easing.quad),
          }),
          -1,
          false // no reverse; when finished it jumps back to 0 and restarts
        )
      );
    });

    // no cleanup required because withRepeat runs forever until unmounted
  }, [duration, sv, waves]);

  // render wave views
  const renderWaves = () =>
    sv.map((shared, i) => {
      const waveSize = size * maxScale; // final visual dimension baseline
      const animatedStyle = useAnimatedStyle(() => {
        // scale from near 0 to 1 -> map to [1, maxScale]
        const s = 1 + shared.value * (maxScale - 1);
        // opacity from 0.9 -> 0
        const o = 0.9 * (1 - shared.value);

        return {
          transform: [{ scale: s }],
          opacity: o,
        };
      });

      return (
        <Animated.View
          key={`wave-${i}`}
          style={[
            styles.wave,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              // place waves behind center by absolute positioning
            },
            animatedStyle,
          ]}
        />
      );
    });

  return (
    <View style={[styles.container, style]}>
      {/* waves put behind center; render them in DOM order (first = back) */}
      <View style={styles.wavesWrapper} pointerEvents="none">
        {renderWaves()}
      </View>

      {/* center circle */}
      <View
        style={[
          styles.center,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        pointerEvents="none"
      >
        {/* optional children inside the center (icon, emoji, etc.) */}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // center everything by default
    alignItems: "center",
    justifyContent: "center",
  },

  wavesWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  wave: {
    position: "absolute",
    // each wave is absolutely centered (scale will grow it)
  },

  center: {
    zIndex: 2,
  },
});
