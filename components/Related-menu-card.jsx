import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { brandShadow } from "../constants/Shadow";
import { Fonts } from "../constants/Fonts";

const RelatedMenuCard = ({ item, onPress }) => {
  const scale = useSharedValue(1);

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[anim]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(0.97, { duration: 120 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 120 }))}
        style={styles.card}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.price}>
            Rp {item.price?.toLocaleString("id-ID")}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default RelatedMenuCard;

const styles = StyleSheet.create({
  card: {
    width: 120,
    borderRadius: 18,
    backgroundColor: "#FFF",
    overflow: "hidden",
    marginRight: 14,

    /** Apple style blur soft shadow */
    boxShadow: brandShadow.subtleBlack,
  },
  image: {
    width: "100%",
    height: 90,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  name: {
    fontSize: 13,
    fontFamily: Fonts.semibold,
    color: "#2E2E2E",
    marginBottom: 3,
  },
  price: {
    fontSize: 14,
    color: "#2E2E2E",
    fontFamily: Fonts.medium,
  },
});
