import {  Text, TouchableOpacity, StyleSheet } from "react-native";
import { Fonts } from "../constants/Fonts";

export default function CategoryCard({ label, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.8} style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
  },
  icon: {
    fontSize: 32,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontFamily:Fonts.semibold
  },
});
