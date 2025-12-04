import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import EmptyIlustrator from '../../assets/images/emptyman1.png';
import { Fonts } from '../../constants/Fonts';

const EmptyStateView = ({ onPressMenu }) => {
  // Shared value untuk animasi vertical
  const translateY = useSharedValue(0);

  useEffect(() => {
    // Animasi naik turun (bounce) berulang-ulang
    translateY.value = withRepeat(
      withTiming(-10, {
        duration: 1000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1, // infinite repeat
      true // reverse direction
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.centeredwraper}>
      <Animated.Image
        style={[styles.image, animatedStyle]}
        source={EmptyIlustrator}
      />

      <Text style={styles.title}>Hmm… masih kosong nih</Text>
      <Text style={styles.subtitle}>
        Mulai jelajahi pilihan makanan yang enak!
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressMenu}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Lihat Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyStateView;

const styles = StyleSheet.create({
  centeredwraper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  image: {
    height: 90,
    width: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.semibold,
    color: '#000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: '#6D6D72',
    textAlign: 'center',
    marginBottom: 22,
  },
  button: {
    height: 44,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#8A63F6',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", // cross-platform lebih clean
},
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    color: '#fff',
  },
});
