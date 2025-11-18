// components/SearchPressable.jsx
import { Pressable, View, Text, StyleSheet } from "react-native";
import { MagnifyingGlassIcon as MagnifyOutline } from "react-native-heroicons/outline";

import {Fonts} from '../constants/Fonts'


export default function SearchPressable({
  placeholder = "Cari makanan, minuman, atau cemilan...",
  onPress = () => {},
  style,
  testID,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed, // sedikit feedback press
      ]}
      accessibilityRole="search"
      accessibilityLabel="Search"
      testID={testID}
    >
      <View style={styles.inner}>
        <MagnifyOutline size={20} color="#8E8E93" />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.placeholder}
        >
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    // modern unified shadow (Apple-like)
    boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",

    // sizing
    height: 50,
    paddingHorizontal: 12,

    // layout
    justifyContent: "center",

    // border subtle
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    marginHorizontal:15,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // RN 0.71+ supports gap; if not, replace with margin on Text
  },
  placeholder: {
    marginLeft: 8,
    color: "#9AA0A6",
    fontSize: 15,
    flex: 1,
    fontFamily:Fonts.regular
  },
  pressed: {
    opacity: 0.8, // quick visual feedback in addition to scale if used
  },
});
