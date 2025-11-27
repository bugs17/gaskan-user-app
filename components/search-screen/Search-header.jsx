import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { ArrowLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { Fonts } from "../../constants/Fonts";

export default function SearchHeader({ searchText, setSearchText }) {
  return (
    <View style={styles.searchWrapper}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <ArrowLeftIcon size={24} color="#000" />
      </Pressable>

      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={18} color="#8E8E93" style={{ marginRight: 6 }} />

        <TextInput
          style={styles.searchInput}
          placeholder="Cari menu..."
          placeholderTextColor="#8E8E93"
          value={searchText}
          onChangeText={setSearchText}
          cursorColor="#C7C7CC"
        />
      </View>
    </View>
  );
}

/* --- Styles (use boxShadow only) --- */
const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 6,
    gap: 12,
  },

  backBtn: {
    padding: 6, // hit area
    borderRadius: 8,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E8E8EE",

    /* USE BOX-SHADOW (string) — suitable for RN Fabric / new styling */
    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",

    // optional subtle inner feel
    overflow: "hidden",
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 6,
    color: "#111",
    fontFamily: Fonts.regular,
  },
});
