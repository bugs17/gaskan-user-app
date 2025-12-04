import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Fonts } from "../constants/Fonts";
import AppleButton from "./Button-apple-custom";



const FeedbackBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["40%", "85%"], []);



  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={({ style }) => (
        <Pressable
          onPress={() => ref.current?.dismiss()}
          style={[style, { flex: 1 }]}
        >
          <BlurView
            intensity={15}
            tint="dark" // opsi: "light" | "dark" | "default"
            experimentalBlurMethod='dimezisBlurView'
            style={[StyleSheet.absoluteFill, {backgroundColor:"rgba(0,0,0,0.20)"}]}
          />
            
        </Pressable>
      )}
      handleIndicatorStyle={{ backgroundColor: "#A9A9A9" }}
    >
        
        {/* HEADER */}
        <View style={[styles.headerWraper]}>
            <View style={[styles.headerRow]}>
                <Text style={styles.title}>
                    Feedback
                </Text>
                
            </View>
        </View>

          {/* STEP CONTENT */}
          <BottomSheetView style={[styles.container, {marginTop:20}]}>
                <View>
                    <View style={[styles.wrapper]}>
                    {/* SMOOTH PLACEHOLDER */}
                    <Text style={styles.placeholder}>
                        Masukan anda sangat membantu app ini.
                    </Text>

                    {/* INPUT */}
                    <BottomSheetTextInput
                        multiline
                        onChangeText={(value) => console.log(value)}
                        onFocus={() => {}}
                        onBlur={() => {}}
                        style={styles.textInput}
                    />
                    </View>
                    <View style={styles.footer}>
                        <AppleButton 
                            title="Kirim Masukan" 
                            onPress={() => {}}
                            style={{
                                boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.18)",
                            }}
                        />

                    </View>
                </View>
                </BottomSheetView>


    </BottomSheetModal>
  );
});

export default FeedbackBottomSheet;


const styles = StyleSheet.create({
  container: { padding: 20 },
  headerWraper:{
        flexDirection:'column',
        gap:10,
        paddingHorizontal:2,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft:20,
        alignItems: "center",
        marginBottom: 10,
        
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.bold,
    },

  wrapper: {
    minHeight: 120,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  textInput: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,

    fontSize: 16,
    color: "#000",

    padding: 0,
    margin: 0,
    textAlignVertical: "top",
  },

  placeholder: {
    position: "absolute",
    top: 14,
    left: 14,
    fontSize: 16,
    color: "rgba(0,0,0,0.4)",
    fontFamily:Fonts.medium
  },
  footer: { 
        marginTop: 20,
        gap: 12
    },


});

