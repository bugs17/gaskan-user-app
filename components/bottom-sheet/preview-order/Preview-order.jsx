import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { AnimatePresence, MotiView } from 'moti'
import { StyleSheet, Text, View } from 'react-native'
import AppleButton from '../../Button-apple-custom'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { Fonts } from '../../../constants/Fonts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PreviewOrder = ({
    keystep,
    items,
    total,
    onPrev,

    // 🔥 Tambahan baru
    ongkir = 8000,
    paymentMethod = "cash",          // "cash" | "gaskan"
    alamat = "Jl. Mawar No. 18, Jakarta",
    note = "Jangan pedes ya kak"
}) => {

    const inset = useSafeAreaInsets()
    const grandTotal = total + ongkir

    const paymentLabel = paymentMethod === "cash" ? "Bayar Cash" : "Saldo Gaskan"

    return (

        <BottomSheetScrollView
            contentContainerStyle={{
                paddingBottom: inset.bottom + 80,
                paddingTop: 10,
            }}
            showsVerticalScrollIndicator={false}
        >
        <MotiView
            key={keystep}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ type: "timing", duration: 220 }}
            >


            {/* list item */}
            <View style={{marginHorizontal:20, marginBottom:20}}>
                <Text style={styles.sectionTitle}>Pesanan Kamu</Text>

                {items.map((item, index) => (
                    <View key={index} style={styles.rowBetween}>
                        <Text style={styles.reviewName}>
                            {item.name} × {item.qty}
                        </Text>
                        <Text style={styles.reviewPrice}>
                            Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </Text>
                    </View>
                ))}

                <View style={styles.rowBetween}>
                    <Text style={styles.totalLabel}>Total Makanan</Text>
                    <Text style={styles.totalPrice}>Rp {total.toLocaleString("id-ID")}</Text>
                </View>
            </View>

            {/* ongkir dan grand total */}
            <View style={{marginHorizontal:20, marginBottom:20}}>
                <Text style={styles.sectionTitle}>Biaya</Text>

                <View style={styles.rowBetween}>
                    <Text style={styles.reviewName}>Ongkir</Text>
                    <Text style={styles.reviewPrice}>
                        Rp {ongkir.toLocaleString("id-ID")}
                    </Text>
                </View>

                <View style={styles.rowBetween}>
                    <Text style={styles.grandLabel}>Grand Total</Text>
                    <Text style={styles.grandPrice}>
                        Rp {grandTotal.toLocaleString("id-ID")}
                    </Text>
                </View>
            </View>
            
            {/* payment */}
            <View style={{marginHorizontal:20, marginBottom:20}}>
                <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

                <View style={styles.box}>
                    <Text style={styles.boxText}>{paymentLabel}</Text>
                </View>
            </View>

            {/* alamat */}
            <View style={{marginHorizontal:20, marginBottom:20}}>
                <Text style={styles.sectionTitle}>Alamat Pengantaran</Text>

                <View style={styles.box}>
                    <Text style={styles.boxText}>{alamat}</Text>
                </View>
            </View>

            {/* NOTE */}
            <View style={{marginHorizontal:20}}>
                <Text style={styles.sectionTitle}>Catatan</Text>

                <View style={styles.box}>
                    <Text style={styles.boxText}>{note || "-"}</Text>
                </View>
            </View>

                
             <View style={styles.footer}>
                    <AppleButton
                        title="Pesan Sekarang"
                        onPress={() => { }}
                        style={{
                                boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.18)",
                            }}
                    />

                    <AppleButton
                        color="#F2F2F7"
                        textStyle={{ color: "#000" }}
                        style={{
                            borderWidth: 1,
                            borderColor: "rgba(0,0,0,0.08)",
                            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)"
                        }}
                        title="Kembali"
                        onPress={onPrev}
                        leftIcon={<ArrowLeftIcon size={12} color={'#8E8E93'} />}
                    />
            </View>

                
        </MotiView>
        </BottomSheetScrollView>
    )
}

export default PreviewOrder

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 17,
        fontFamily: Fonts.semibold,
        marginBottom: 6,
        color: "#000",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    reviewName: {
        fontSize: 16,
        fontFamily: Fonts.regular,
    },
    reviewPrice: {
        fontSize: 16,
        fontFamily: Fonts.regular,
    },
    totalLabel: {
        marginTop: 4,
        fontSize: 16,
        fontFamily: Fonts.semibold,
    },
    totalPrice: {
        fontSize: 17,
        fontFamily: Fonts.semibold,
        color: "#34C759",
    },
    grandLabel: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: Fonts.bold,
    },
    grandPrice: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: "#34C759",
    },
    box: {
        backgroundColor: "#F2F2F7",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
    },
    boxText: {
        fontSize: 15,
        fontFamily: Fonts.regular,
        color: "#000",
    },
    footer: {
        marginTop: 30,
        gap: 12,
        marginHorizontal:20
    },
})
