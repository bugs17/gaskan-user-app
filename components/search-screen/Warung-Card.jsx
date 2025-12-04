import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Fonts } from "../../constants/Fonts";

const WarungCard = ({ image, name, isOpen = true, rating = 4.5, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      disabled={!isOpen}
      activeOpacity={0.85}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        {/* Extra info row */}
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {rating}</Text>

          <View
            style={[
              styles.badge,
              isOpen ? styles.badgeOpen : styles.badgeClosed,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isOpen ? styles.badgeTextOpen : styles.badgeTextClosed,
              ]}
            >
              {isOpen ? "Buka" : "Tutup"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WarungCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    alignItems: "center",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },

  image: {
    width: 82,
    height: 82,
    borderRadius: 16,
    backgroundColor: "#F3F3F5",
  },

  info: {
    marginLeft: 14,
    flex: 1,
    gap: 4,
  },

  name: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    color: "#111",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },

  rating: {
    fontSize: 13,
    color: "#777",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },

  badgeOpen: {
    backgroundColor: "#E6F8E7",
  },

  badgeClosed: {
    backgroundColor: "#FFE8E7",
  },

  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },

  badgeTextOpen: {
    color: "#28A745",
  },

  badgeTextClosed: {
    color: "#FF3B30",
  },
});
