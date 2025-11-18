


import { Pressable } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    } from 'react-native-reanimated';





const TabbarButton = ({ children, onPress, ...props }) => {
    const scale = useSharedValue(1);
    
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
        }));
    
        const pressIn = () => {
        scale.value = withSpring(0.85, {
            damping: 15,
            stiffness: 200,
        });
        };
    
        const pressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 200,
        });
        };
    
        return (
        <Pressable
            onPress={onPress}
            onPressIn={pressIn}
            onPressOut={pressOut}
            style={({ pressed }) => ({
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.3 : 1, // 👈 efek opacity TETAP ADA
            })}
            {...props}
        >
            <Animated.View
            style={[
                {
                flex: 1,
                paddingTop: 6,
                alignItems: "center",
                justifyContent: "center",
                },
                animatedStyle,
            ]}
            >
            {children}
            </Animated.View>
        </Pressable>
        );
}

export default TabbarButton