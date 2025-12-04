import { Pressable } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

export default function CloseButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#F2F2F7",
        alignItems: "center",
        justifyContent: "center",

        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)"
      }}
    >
      <XMarkIcon size={18} color="#000" strokeWidth={2} />
    </Pressable>
  );
}
