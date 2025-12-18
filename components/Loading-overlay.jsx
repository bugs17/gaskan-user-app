import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useUiStore } from '../store/ui-state'

const LoadingOverlay = () => {
    const {loadingScreen, setLoadingScreen} = useUiStore()


    
    if (!loadingScreen) return null

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Prosess...</Text>
        <Pressable onPress={() => setLoadingScreen(false)}>
            <Text style={[styles.text, {color:'blue'}]}>Tutup...</Text>
        </Pressable>
        </View>
    )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        zIndex:999
    },
    text:{
        color:'#000'
    }
})