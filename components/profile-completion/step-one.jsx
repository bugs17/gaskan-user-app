import { StyleSheet, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { MotiView } from "moti";
import { useProfileCompletionStore } from "../../store/profile-completion-store";
import AppleButton from "../Button-apple-custom";
import { Fonts } from "../../constants/Fonts";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const StepOne = () => {
  const [error, setError] = useState("");

  const {
    step,
    firstName,
    lastName,
    phone,
    setFirstName,
    setLastName,
    setPhone,
    setStep,
  } = useProfileCompletionStore();

  const handleNext = () => {
    if (!firstName || !lastName || !phone) {
      setError('Semua field wajib diisi')
      return
    }

    setStep(step + 1);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
    >
      <MotiView
        key={`step-${step}`}
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 300 }}
        style={styles.container}
      >
        <KeyboardAvoidingView>
          <Text style={styles.title}>🪪 Lengkapi Profil</Text>
          <Text style={styles.subtitle}>
            Masukkan data diri kamu terlebih dahulu
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nama depan"
            value={firstName}
            cursorColor={"#8A63F6"}
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => {
              setError("");
              setFirstName(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Nama belakang"
            value={lastName}
            cursorColor={"#8A63F6"}
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => {
              setError("");
              setLastName(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Nomor telepon"
            keyboardType="phone-pad"
            value={phone}
            cursorColor={"#8A63F6"}
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => {
              setError("");
              setPhone(text);
            }}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppleButton
              title="Lanjut"
              onPress={handleNext}
              color={"#8A63F6"}
              style={{
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: "0px 6px 12px rgba(138, 99, 246, 0.28)",
              }}
          />
        </KeyboardAvoidingView>
      </MotiView>
    </ScrollView>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },

  title: {
    fontSize: 24,
    color: "#111",
    marginBottom: 4,
    fontFamily: Fonts.semibold,
  },

  subtitle: {
    fontSize: 14,
    color: "#6E6E73",
    marginBottom: 24,
    fontFamily: Fonts.semibold,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#F2F2F7",
    fontFamily: Fonts.regular,
  },

  error: {
    color: "red",
    marginBottom: 12,
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
});
