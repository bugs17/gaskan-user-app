import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const MapStyleSwitcher = ({ value, onChange, MAP_STYLES}) => {
  const isSatellite = value === MAP_STYLES.SATELLITE;

  return (
    <View style={switcherStyles.container}>
      <TouchableOpacity
        style={[
          switcherStyles.button,
          !isSatellite && switcherStyles.active,
        ]}
        onPress={() => onChange(MAP_STYLES.OUTDOORS)}
      >
        <Text
          style={[
            switcherStyles.text,
            !isSatellite && switcherStyles.activeText,
          ]}
        >
          Map
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          switcherStyles.button,
          isSatellite && switcherStyles.active,
        ]}
        onPress={() => onChange(MAP_STYLES.SATELLITE)}
      >
        <Text
          style={[
            switcherStyles.text,
            isSatellite && switcherStyles.activeText,
          ]}
        >
          Earth
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapStyleSwitcher

const switcherStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 4,
    elevation: 4, // android
    shadowColor: '#000', // ios
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  active: {
    backgroundColor: '#111827',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  activeText: {
    color: '#FFFFFF',
  },
});

