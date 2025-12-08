import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BellAlertIcon } from 'react-native-heroicons/solid'

import {Fonts} from '../constants/Fonts'
import { useSafePush } from '../utils/useSafePush'

const HeaderHome = () => {
    const push = useSafePush()
  return (
    <View style={styles.header}>
        <View style={styles.greting}>
            <Text style={styles.text}>Selamat datang!</Text>
            <Text style={styles.text}>Siap pesan makanan?</Text>
        </View>
        <TouchableOpacity onPress={() => push('/notifikasi')} activeOpacity={.8} style={styles.notif}>
            <BellAlertIcon size={24} color="#8E8E93" />
        </TouchableOpacity>
    </View>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
    header:{
        height: 100,
        padding:15,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    greting:{
        flexShrink: 1,
        flexWrap: "wrap",
        maxWidth: "80%",
    },
    text:{
        fontSize: 25,
        lineHeight: 34,
        fontFamily: Fonts.bold
    },
    notif:{
        height:45,
        width:45,
        borderRadius:45 / 2,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        boxShadow: "0px 6px 18px rgba(0,0,0,0.12)"
        // boxShadow: "0px 4px 12px rgba(0,0,0,0.10)"

    },
})