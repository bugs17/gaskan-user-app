import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";




// ------------------
// CATEGORY ANIMATED BUTTON
// ------------------
const AnimatedCategoryButton = ({ label, isActive, onPress }) => {

  const scale = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isActive ? 0.96 : 1, { damping: 12 }) }
    ],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isActive ? "#4B6BFF" : "#F2F2F7", { duration: 180 }),
    boxShadow: isActive
      ? "0px 4px 12px rgba(75,107,255,0.32)"
      : "0px 4px 10px rgba(0,0,0,0.10)",
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isActive ? "#fff" : "#6C6C70", { duration: 160 }),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isActive ? 1 : 0.8, { duration: 160 }),
  }));

  return (
    <Animated.View style={[scale]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Animated.View style={[styles.categoryButton, animatedStyle]}>
          
          {/* ICON */}
          <Animated.Text style={[styles.icon, iconStyle]}>
            {label === "Makanan" && "🍛"}
            {label === "Minuman" && "🥤"}
            {label === "By Warung" && "🏬"}
          </Animated.Text>

          {/* TEXT */}
          <Animated.Text style={[styles.categoryText, textStyle]}>
            {label}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// manual category
const categories = ['Makanan', 'Minuman', 'By Warung'];


const CategoriesButton = () => {
    const [selectedCategory, setSelectedCategory] = useState('Makanan');
    
    return (
        <View style={styles.categories}>
            {categories.map(cat => (
                <AnimatedCategoryButton
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
                />
            ))}
        </View>
    )
}

export default CategoriesButton

const styles = StyleSheet.create({
    categories: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 5,
    paddingHorizontal:16,
    width: '100%',
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
  },

  icon: {
    fontSize: 15,
    marginRight: 6,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
})