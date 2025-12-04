import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Fonts } from '../constants/Fonts';




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
    backgroundColor: withTiming(isActive ? "#8A63F6" : "#fff", { duration: 180 }),
    boxShadow: isActive
      ? "0px 4px 12px rgba(60, 35, 130, 0.25)"
      : "0px 4px 10px rgba(0,0,0,0.10)",
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isActive ? "#fff" : "#6C6C70", { duration: 160 }),
  }));


  return (
    <Animated.View style={[scale]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Animated.View style={[styles.categoryButton, animatedStyle]}>
          
          <Animated.Text style={[styles.categoryText, textStyle, isActive && {fontFamily:Fonts.semibold}]}>
            {label}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// manual category


const CategoriesButtonWarungScreen = ({categories, onPress}) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    
    return (
        <View style={[styles.categories]}>
            {categories.map(cat => (
                <AnimatedCategoryButton
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onPress={() => {
                  setSelectedCategory(cat)
                  onPress(cat)
                }}
                />
            ))}
        </View>
    )
}

export default CategoriesButtonWarungScreen

const styles = StyleSheet.create({
    categories: {
    flexDirection: 'row',
    alignItems:'center',
    gap: 5,
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
    fontFamily:Fonts.regular
  },
})