import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Fonts } from "../../constants/Fonts";

const MenuCard = ({ image, name, price, status, rating = 4.8, onPress }) => {
  const isAvailable = status === true;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      disabled={!isAvailable}
      activeOpacity={0.85}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.price}>Rp {price?.toLocaleString()}</Text>

        {/* Extra info row */}
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {rating}</Text>

          <View
            style={[
              styles.badge,
              isAvailable ? styles.badgeAvailable : styles.badgeSold,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isAvailable ? styles.badgeTextAvailable : styles.badgeTextSold,
              ]}
            >
              {isAvailable ? "Tersedia" : "Sold Out"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    alignItems: "center",

    // Apple-tier shadow (lebih soft & realistic)
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
    fontFamily:Fonts.semibold,
    color: "#111",
  },

  price: {
    fontSize: 15,
    fontFamily:Fonts.medium,
    color: "#34C759",
    marginTop: 2,
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

  /* BADGE */
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },

  badgeAvailable: {
    backgroundColor: "#E6F8E7",
  },

  badgeSold: {
    backgroundColor: "#FFE8E7",
  },

  badgeText: {
    fontSize: 12,
    fontFamily:Fonts.regular
  },

  badgeTextAvailable: {
    color: "#28A745",
  },

  badgeTextSold: {
    color: "#FF3B30",
  },
});
