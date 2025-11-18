import { StyleSheet, Text, View } from 'react-native'
import {Fonts} from '../../constants/Fonts'
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pesanan</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:30,
        width:'100%',
        paddingHorizontal:20
    },
    label:{
        fontSize: 25,
        lineHeight: 34,
        fontFamily: Fonts.bold
    }
})