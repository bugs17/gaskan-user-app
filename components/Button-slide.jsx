import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ArrowRightIcon } from "react-native-heroicons/solid";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const THUMB_SIZE = 60;

export default function SlideToConfirm({ onConfirm, label }) {
  const translateX = useSharedValue(0);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    onConfirm?.();
    setTimeout(() => setLoading(false), 1500);
    translateX.value = withSpring(0);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
        if (loading) return;
      translateX.value = Math.min(
        Math.max(event.translationX, 0),
        SLIDER_WIDTH - THUMB_SIZE
      );
    })
    .onEnd(() => {
        if (loading) return;
      if (translateX.value >= SLIDER_WIDTH - THUMB_SIZE - 5) {
        runOnJS(handleConfirm)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: translateX.value + THUMB_SIZE / 2,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SLIDER_WIDTH - THUMB_SIZE - 20],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.track, progressStyle]} />
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.thumb, thumbStyle]}>
          {loading ? <ActivityIndicator color="#fff" /> : <ArrowRightIcon color="#fff" size={28} />}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#E5E5EA",
    justifyContent: "center",
    paddingHorizontal: 5,
    alignSelf: "center",
    marginVertical: 20,
    overflow:'hidden'
  },
  track: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#007AFF",
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderTopRightRadius: THUMB_SIZE / 2,
    borderBottomRightRadius: THUMB_SIZE / 2,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
