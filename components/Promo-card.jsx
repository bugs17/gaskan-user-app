import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../constants/Fonts";

export default function PromoCard({ title = "Gratis ongkir segera hadir!", emoji = "🚚" }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Segera</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.10)",

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    justifyContent: "space-between"
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily:Fonts.bold,
    lineHeight: 24,
    color: "#000",
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily:Fonts.regular,
    color: "#555",
  },
});
