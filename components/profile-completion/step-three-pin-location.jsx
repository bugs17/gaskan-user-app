import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AppleButton from "../Button-apple-custom";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useProfileCompletionStore } from "../../store/profile-completion-store";
import { MotiView } from "moti";
import { Camera, MapView, PointAnnotation } from "@rnmapbox/maps";
import * as Location from 'expo-location';
import MapStyleSwitcher from "../Overlay-button-map-style";

const MAP_STYLES = {
  OUTDOORS: 'mapbox://styles/mapbox/outdoors-v12',
  SATELLITE: 'mapbox://styles/mapbox/satellite-streets-v12',
};

const PinLokasiDanAlamat = () => {
    const [mapReady, setMapReady] = useState(false);
    const [mapStyle, setMapStyle] = useState(MAP_STYLES.OUTDOORS);
    const { step, setStep, setCoordinates, coordinates, address, setAddress } = useProfileCompletionStore();
    const [userCurentLocation, setUserCurentLocation] = useState({
            longitude:0,
            latitude: 0
        })

    useEffect(() => {
            const getCurentLocation = async () => {
            const location = await Location.getCurrentPositionAsync({});
            const longitude = location?.coords?.longitude
            const latitude = location?.coords?.latitude
            setUserCurentLocation({
                                    longitude:longitude,
                                    latitude:latitude
                                })
            setCoordinates(longitude, latitude)
        }
        if (coordinates.longitude === null && coordinates.latitude === null) {
          getCurentLocation()
        }else{
          setUserCurentLocation({longitude:coordinates.longitude, latitude:coordinates.latitude})
        }
    },[])

    const isAlamatReady = address.trim().length > 5;
    const coordinatesReady = coordinates.longitude && coordinates.latitude
    const canContinue = isAlamatReady && coordinatesReady

    const handleLongPres = (e) => {
      setUserCurentLocation({
        longitude: e.geometry.coordinates[0],
        latitude: e.geometry.coordinates[1]
      })
      setCoordinates(e.geometry.coordinates[0], e.geometry.coordinates[1])
    }

  return (
    <MotiView
      key={`step-${step}`}
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300, }}
      style={styles.container}
    >
      {/* Header */}
      <Text style={styles.title}>📍 Tentukan Lokasi Anda</Text>
      <Text style={styles.subtitle}>
        Kamu bisa menggeser pin 📍 atau tekan lama pada peta untuk menentukan lokasi pengantaran. Perbesar peta supaya titik yang dipilih lebih akurat.
      </Text>

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <MapView onLongPress={handleLongPres} onDidFinishLoadingStyle={() => setMapReady(true)} attributionEnabled={false} scaleBarEnabled={false} logoEnabled={false} style={StyleSheet.absoluteFill} styleURL={mapStyle}>
            {mapReady && (<Camera  zoomLevel={16} centerCoordinate={[userCurentLocation.longitude, userCurentLocation.latitude]} />)}
            {/* pin for tujuan lokasi */}
            <PointAnnotation
                draggable
                id="coordinatPosition"
                coordinate={[userCurentLocation.longitude, userCurentLocation.latitude]}
                anchor={{ x: 0.5, y: 1 }} // anchor bottom-center, agar “titik” di map tepat
                onDragEnd={(e) => setCoordinates(e.geometry.coordinates[0],e.geometry.coordinates[1])}
            />
        </MapView>
        <MapStyleSwitcher MAP_STYLES={MAP_STYLES} value={mapStyle} onChange={setMapStyle} />
      </View>

      {/* Address Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Alamat / Nama Jalan</Text>
        <TextInput
          placeholder="Contoh: Jl. Sudirman No. 12"
          cursorColor={"#8A63F6"}
          placeholderTextColor="#9CA3AF"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
      </View>

      {/* Continue Button */}
      <View style={{ flexDirection: "column", gap: 8 }}>
        <AppleButton
          title="Lanjut"
          onPress={() => setStep(4)}
          color={"#8A63F6"}
          disabled={!canContinue}
          style={{
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.18)",
            ...(canContinue && {
              boxShadow: "0px 6px 12px rgba(138, 99, 246, 0.28)",
            }),
          }}
        />

        <AppleButton
          color="#F2F2F7"
          textStyle={{ color: "#000" }}
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.08)",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.28)",
          }}
          title="Kembali"
          onPress={() => setStep(2)}
          leftIcon={<ArrowLeftIcon size={12} color={"#8E8E93"} />}
        />
      </View>
    </MotiView>
  );
};

export default PinLokasiDanAlamat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },

  mapPlaceholder: {
    height: 220,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    overflow:'hidden',
    marginBottom: 20,
    position: "relative",
  },

  pin: {
    fontSize: 36,
  },

  mapHint: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
  },

  inputWrapper: {
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#F9FAFB",
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#8A63F6", // brand color
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
