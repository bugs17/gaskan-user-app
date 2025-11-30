import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { MotiView } from 'moti'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StepperButton from '../../Stepper-button'
import NumberAnimation from '../../Number-animation-gpt'
import { Fonts } from '../../../constants/Fonts'
import AppleButton from '../../Button-apple-custom'

const CartStep = ({keystep, items, total, onNext, onUpdateQty}) => {
    const inset = useSafeAreaInsets()
    
  return (
    <MotiView
        key={keystep}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -10 }}
        transition={{ type: "timing", duration: 220 }}
    >
        <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: inset.bottom + 80}}
        showsVerticalScrollIndicator={false}
        >
        {items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
            <Image style={styles.itemImage} source={{ uri: item.image }} />

            <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rp {item.price.toLocaleString("id-ID")}</Text>
            </View>

            <View style={styles.stepper}>
                <StepperButton onPress={() => onUpdateQty(item.id, "dec")}>-</StepperButton>
                <NumberAnimation value={item.qty} fontSize={16} />
                <StepperButton onPress={() => onUpdateQty(item.id, "inc")}>+</StepperButton>
            </View>
            </View>
        ))}
        {/* FOOTER */}
        <View style={[styles.footer, {marginHorizontal:20}]}>
            <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <NumberAnimation value={total.toLocaleString("id")} fontSize={18} prefix="Rp " color="#34C759" />
            </View>

            <AppleButton 
                title={"Lanjut"} 
                onPress={onNext} 
                style={{boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)"}}
            />

            <AppleButton
                color="#F2F2F7"
                textStyle={{ color: "#000", fontSize: 16 }}
                style={{ borderWidth: 1, borderColor: "rgba(0,0,0,0.08)", boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)" }}
                title={"Tambah menu lagi"}
                onPress={() => {}}
            />
        </View>
        </BottomSheetScrollView>

    </MotiView>
  )
}

export default CartStep

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        marginHorizontal:20
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: "#ddd",
    },
    itemName: { fontSize: 16, fontFamily: Fonts.semibold },
    itemPrice: { fontSize: 14, color: "#888" },
    stepper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    footer: { 
        marginTop: 20,
        gap: 12, 
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    totalLabel: { fontSize: 16, fontFamily: Fonts.bold },

})