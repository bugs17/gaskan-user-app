// components/GradientCard.jsx
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ramen from "../assets/images/ramen.png";

import {Fonts} from '../constants/Fonts'


export default function GradientCard({ children, style }) {
  return (
    <View
      style={[styles.card, style]}
    >
      <View style={styles.inner}>
        <Text style={styles.tagline}>
          Jelajahi pilihan makanan di sekitarmu.
        </Text>

        <TouchableOpacity activeOpacity={.8} style={styles.ctaButton}>
            <Text style={styles.ctaText}>Cek sekarang</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={ramen} style={styles.ilustrasi} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        overflow: "hidden",
        height: 200,
        marginHorizontal: 15,
        boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.04)",
        backgroundColor:"#fff"
    },
    inner: {
        flex: 1,
        padding: 20,
        position: "relative",
    },
    imageContainer: {
        position: "absolute",
        right: -20,
        bottom: -28,
    },
    ilustrasi: {
        height: 220,
        width: 220,
    },
    tagline: {
        fontSize: 25,
        lineHeight: 34,
        color: "#000000",
        maxWidth: "85%",
        fontFamily:Fonts.bold
    },
    ctaButton: {
        backgroundColor: "#8E8E93",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.20)", // Apple-style border di dark surface
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: "flex-start",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
        marginTop:18
    },
    ctaText: {
        fontSize: 16,
        fontFamily: Fonts.semibold,
        color: "#F5F5F5", // tetap soft, tidak pure white
    },
});
