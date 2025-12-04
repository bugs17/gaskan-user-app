import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Fonts } from '../../constants/Fonts'
import { MotiView } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseButton from './Close-btn';

const { width } = Dimensions.get("window");


const Header = ({step, items, onCLose}) => {

    const progressWidth = ((width - 40) / 5) * step;
    const inset = useSafeAreaInsets()

    const condition = (step === 1 && items.length > 3) || step === 5;
    

    return (
        <View style={[styles.headerWraper, {paddingTop: condition ? inset.top : 0}]}>
            <View style={[styles.headerRow]}>
                <Text style={styles.title}>
                    {step === 1 ? "Keranjang" : step === 2 ? "Catatan" : step === 3 ? "Lokasi" : step === 4 ? "Metode Pembayaran" : "Konfirmasi Pesanan"}
                </Text>
                {condition && (
                    <CloseButton onPress={onCLose} />
                )}
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