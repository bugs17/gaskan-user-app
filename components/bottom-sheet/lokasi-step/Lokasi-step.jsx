import { BottomSheetView } from '@gorhom/bottom-sheet'
import { MotiView } from 'moti'
import { StyleSheet, Text, View } from 'react-native'
import AppleButton from '../../Button-apple-custom'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { Fonts } from '../../../constants/Fonts'

const LokasiStep = ({keystep, onNext, onPrev}) => {
  return (
    <BottomSheetView style={[styles.container, {marginTop:50}]}>
        <MotiView
            key={keystep}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 220 }}
        >
        <View style={{ flex: 1, gap: 20 }}>
            <View style={styles.mapCard}>
                <View style={styles.pinDot} />
            </View>

            <Text style={styles.locationText}>Pastikan lokasi kamu sudah tepat.</Text>

            <View style={styles.footer}>
                <AppleButton 
                    title="Lanjut" onPress={onNext}
                    style={{
                      boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.18)",
                  }}
                />

                <AppleButton
                    color="#F2F2F7"
                    textStyle={{ color: "#000" }}
                    style={{ borderWidth: 1, borderColor: "rgba(0,0,0,0.08)", boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)" }}
                    title="Kembali"
                    onPress={onPrev}
                    leftIcon={<ArrowLeftIcon size={12} color={'#8E8E93'} />}
                />
            </View>
            </View>
        </MotiView>
    </BottomSheetView>
  )
}

export default LokasiStep

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    mapCard: {
        backgroundColor: "#f2f2f7",
        height: 180,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    pinDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ff3b30",
    },
    locationText: {
        fontSize: 16,
        fontFamily: Fonts.semibold,
        textAlign: "center",
    },
    footer: { 
        marginTop: 20,
        gap: 12
    },
})