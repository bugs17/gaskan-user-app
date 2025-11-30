import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Fonts } from '../../constants/Fonts'
import { MotiView } from 'moti'

const { width } = Dimensions.get("window");


const Header = ({step}) => {
    const progressWidth = ((width - 40) / 4) * step;

    return (
        <View style={styles.headerWraper}>
            <View style={styles.headerRow}>
            <Text style={styles.title}>
                {step === 1 ? "Keranjang" : step === 2 ? "Catatan" : step === 3 ? "Lokasi" : "Konfirmasi Pesanan"}
            </Text>

            </View>
            <View style={styles.progressBackground}>
            <MotiView
                style={styles.progressFill}
                animate={{ width: progressWidth }}
                transition={{ type: "timing", duration: 250 }}
            />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerWraper:{
        flexDirection:'column',
        gap:10,
        paddingHorizontal:20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.bold,
    },
    progressBackground: {
        height: 4,
        width: "100%",
        backgroundColor: "#E5E5EA", // Apple gray
        borderRadius: 2,
    },
    progressFill: {
        height: 4,
        backgroundColor: "#8A63F6",
        borderRadius: 2,
    },
})