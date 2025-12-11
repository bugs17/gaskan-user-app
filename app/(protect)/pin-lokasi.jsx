import { StyleSheet, Text, View } from 'react-native'
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppleButton from '../../components/Button-apple-custom'
import { Fonts } from '../../constants/Fonts'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'


const PinLokasi = () => {
    const inset = useSafeAreaInsets()
    const route = useRouter()
    const [userCurentLocation, setUserCurentLocation] = useState({
        longitude:0,
        latitude: 0
    })
    const [userPinPosition, setUserPinPosition] = useState({
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
        }
        getCurentLocation()
    },[])

    const handleSaveNewCoordinates = () => {
        if (userPinPosition.latitude === 0 || userPinPosition.longitude === 0) {
            console.log("User tidak memilih lokasi baru")
            return
        }

        console.log("Melaukan send new coordinates to supabase")
    }

  return (
    <View style={{flex:1}}>

      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/outdoors-v12">
            <Camera zoomLevel={16} centerCoordinate={[userCurentLocation.longitude, userCurentLocation.latitude]} />
            {/* pin for tujuan lokasi */}
            <PointAnnotation
                draggable
                id="coordinatPosition"
                coordinate={[userCurentLocation.longitude, userCurentLocation.latitude]}
                anchor={{ x: 0.5, y: 1 }} // anchor bottom-center, agar “titik” di map tepat
                onDragEnd={(e) => setUserPinPosition({
                    longitude:e.geometry.coordinates[0],
                    latitude:e.geometry.coordinates[1]
                })}
            />
        </MapView>
        <View style={[styles.wrapperInfo,{top:inset.top + 10}]}>
            <Text style={{fontFamily:Fonts.semibold}}>Tahan dan drag pin 📍 untuk menandai lokasi anda.</Text>
            <Text style={{fontFamily:Fonts.semibold}}>Zoom untuk mendapatkan posisi detail.</Text>
        </View>
        <View style={[styles.wrapperBtn,{ bottom:inset.bottom + 20 }]}>
            <AppleButton title={"📍 Simpan"}  onPress={handleSaveNewCoordinates} style={{width:'100%', boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.28)",}} />
            <AppleButton title={"Kembali"} color='#8E8E93' leftIcon={<ArrowLeftIcon size={16} color="#fff" strokeWidth={2} />} onPress={() => route.back()} style={{width:'100%', boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.28)",}} />
        </View>
    </View>
  )
}

export default PinLokasi

const styles = StyleSheet.create({
    wrapperInfo:{
        position:'absolute',
        padding:20, 
        left:20, 
        right:20,
        borderRadius:18, 
        backgroundColor:'#fff', 
        justifyContent:'center', 
        alignItems:'center', 
        borderColor: "rgba(0,0,0,0.50)",
        borderWidth:.5
    },
    wrapperBtn:{
        position:'absolute',
        left:20, 
        right:20, 
        gap:10 
    }
})