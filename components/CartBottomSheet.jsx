import React, { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function CartBottomSheet({ bottomSheetRef }) {
  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}     // default closed
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => <BlurBackdrop {...props} />}
    >
      <View style={styles.contentContainer}>
        {/* TEMP - content nanti diganti cart list */}
        <View style={styles.placeholder}>
          <View style={{ height: 140, justifyContent: "center" }}>
            <Animated.Text style={{ textAlign: "center", fontSize: 18 }}>
              Cart is empty (example)
            </Animated.Text>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}

function BlurBackdrop({ animatedIndex, style }) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  return (
    <Animated.View style={[styles.backdropContainer, animatedStyle]}>
      <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },

  placeholder: {
    alignItems: "center",
  },

  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
