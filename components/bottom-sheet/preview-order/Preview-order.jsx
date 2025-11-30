import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { MotiView } from 'moti'
import { StyleSheet, Text, View } from 'react-native'
import AppleButton from '../../Button-apple-custom'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { Fonts } from '../../../constants/Fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PreviewOrder = ({key, items,total, onPrev}) => {
    const inset = useSafeAreaInsets()
    return (
        <MotiView
            key={key}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: "timing", duration: 220 }}
            style={{ flex: 1 }}
        >
            <BottomSheetScrollView
                contentContainerStyle={{ paddingBottom: inset.bottom + 80, paddingTop:10}}
                showsVerticalScrollIndicator={false}
            >
            <View style={{ flex: 1, justifyContent: "space-between", marginHorizontal:20 }}>
                <View style={{ gap: 16 }}>

                {items.map((item, index) => (
                    <View key={index} style={styles.reviewRow}>
                        <Text style={styles.reviewName}>
                            {item.name} × {item.qty}
                        </Text>
                        <Text style={styles.reviewPrice}>Rp {(item.price * item.qty).toLocaleString("id-ID")}</Text>
                    </View>
                ))}

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrice}>Rp {total.toLocaleString("id-ID")}</Text>
                </View>
                </View>

                <View style={styles.footer}>
                    <AppleButton 
                        title="Pesan Sekarang" 
                        onPress={() => {}} 
                        style={{boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)"}}
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
            </BottomSheetScrollView>
        </MotiView>
    )
}

export default PreviewOrder

const styles = StyleSheet.create({
    reviewRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    reviewName: {
        fontSize: 16,
        fontFamily: Fonts.regular,
    },
    reviewPrice: { fontSize: 16, fontFamily: Fonts.regular, },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    totalLabel: { fontSize: 16, fontFamily: Fonts.bold },
    totalPrice: {
        fontSize: 18,
        fontFamily: Fonts.semibold,
        color: "#34C759",
    },
    footer: { 
        marginTop: 20,
        gap: 12
    },
})