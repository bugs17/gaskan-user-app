import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { Fonts } from "../constants/Fonts";

export default function FloatingCartButton({ visible, onPress, totalItems }) {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <ShoppingBagIcon size={22} color="#fff" />

        {/* Badge jumlah item */}
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>

      <Text style={styles.text}>Cek Pesananmu</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15, 
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,

    // Shadow Apple Style
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#ff4040",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily:Fonts.medium
  },

  text: {
    color: "#fff",
    fontFamily:Fonts.bold,
    fontSize: 16,
  },
});
