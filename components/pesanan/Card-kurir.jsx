import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Fonts } from "../../constants/Fonts";
import { ChatBubbleLeftRightIcon } from "react-native-heroicons/solid";
import KurirPhoto from "../../assets/images/kurir-placeholder.png";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useSafePush } from "../../utils/useSafePush";


// ==========================
//   Motor Pulse Animation (Fixed Flip Right)
// ==========================
const AnimatedMotor = ({ children }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 300 })
      ),
      -1, // infinite loop
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { scaleX: -1 }, // motor flip ke kanan (dimasukkan ke transform animated)
    ],
  }));

  return (
    <Animated.Text style={[{ fontSize: 25 }, pulseStyle]}>
      {children}
    </Animated.Text>
  );
};


// ==========================
//   Single-Time Line Expand
// ==========================
const AnimatedLine = ({ active }) => {
  const width = useSharedValue(active ? 0 : 1);

  useEffect(() => {
    if (active) {
      width.value = withTiming(1, { duration: 480 });
    }
  }, [active]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scaleX: width.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          height: 2,
          borderRadius: 2,
          backgroundColor: active ? "#E6F8E7" : "#D1D1D6",
          transformOrigin: "left",
        },
        style,
      ]}
    />
  );
};



const CourierCard = () => {
  const statuses = ["Menuju", "Ambil", "Antar"];
  const currentStep = 2; // active
  const push = useSafePush()

  const scale = useSharedValue(1);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.card}>
      {/* Courier Info */}
      <View style={styles.courierRow}>
        <Image source={KurirPhoto} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Rizky Saputra</Text>
          <Text style={styles.vehicle}>Motor | B 1234 XYZ</Text>
        </View>

        <Animated.View style={[anim]}>
          <Pressable 
            style={[styles.chatButton]}
            onPressIn={() => (scale.value = withTiming(0.96, { duration: 80 }))}
            onPressOut={() => (scale.value = withTiming(1, { duration: 80 }))}
            onPress={() => push({pathname:'/chat', params:{driverId:123}})}
          >
            <ChatBubbleLeftRightIcon size={25} color="#8E8E93" />
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.separator} />

      {/* TRACKING BAR */}
      <View style={styles.trackingWrapper}>

        {/* LEFT SECTION */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {currentStep === 0 ? (
            <AnimatedMotor>🛵</AnimatedMotor>
          ) : currentStep > 0 ? (
            <View style={styles.dotDone} />
          ) : (
            <View style={styles.greyDot} />
          )}

          <AnimatedLine active={currentStep > 0} />
        </View>

        {/* MIDDLE SECTION */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {currentStep === 1 ? (
            <AnimatedMotor>🛵</AnimatedMotor>
          ) : currentStep > 1 ? (
            <View style={styles.dotDone} />
          ) : (
            <View style={styles.greyDot} />
          )}
        </View>

        {/* RIGHT SECTION */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <AnimatedLine active={currentStep > 1} />

          {currentStep === 2 ? (
            <AnimatedMotor>🛵</AnimatedMotor>
          ) : currentStep > 2 ? (
            <View style={styles.dotDone} />
          ) : (
            <View style={styles.greyDot} />
          )}
        </View>
      </View>

      {/* LABELS */}
      <View style={styles.labelsRow}>
        {statuses.map((label, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <Text
              key={index}
              style={[
                styles.stepLabel,
                (isActive || isDone) && styles.stepLabelActive,
                {
                  textAlign:
                    index === 0 ? "left" :
                    index === 1 ? "center" :
                    "right",
                },
              ]}
            >
              {label}
            </Text>
          );
        })}
      </View>


        <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => push('/live-tracking')}
        style={styles.trackButton}
        >
            <Text style={styles.trackText}>Lacak</Text>
            <ChevronRightIcon size={16} color="#f5f5f5" />
        </TouchableOpacity>
    </View>
  );
};

export default CourierCard;



// ==========================
//        STYLES
// ==========================
const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0px 6px 18px rgba(0,0,0,0.10)",
    borderColor: "rgba(0,0,0,0.04)",
    borderWidth: 1,
  },

  courierRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 16,
    marginRight: 14,
    backgroundColor: "gray",
  },

  name: {
    fontSize: 17,
    fontFamily: Fonts.semibold,
    color: "#000",
  },

  vehicle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#6b7280",
    marginTop: 2,
  },

  chatButton: {
    padding: 8,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginBottom: 16,
  },

  trackingWrapper: {
    marginTop: 4,
    flexDirection: "row",
  },

  greyDot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: "#D1D1D6",
  },

  dotDone: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: "#34C759",
  },

  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  stepLabel: {
    width: "33%",
    fontSize: 13,
    color: "#8E8E93",
    fontFamily: Fonts.regular,
  },

  stepLabelActive: {
    color: "#000",
    fontFamily: Fonts.semibold,
  },
  trackButton: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#8E8E93",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)", // Apple-style border di dark surface
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
    },

trackText: {
  fontSize: 16,
  fontFamily: Fonts.semibold,
  color: "#F5F5F5", // tetap soft, tidak pure white
},

});
