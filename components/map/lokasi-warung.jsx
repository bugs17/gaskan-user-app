import { StyleSheet, Text, View } from 'react-native'
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps'
import { useRef } from 'react'

const LokasiWarung = ({coordinate}) => {
    const cameraRef = useRef(null)
  return (
    <View style={{flex:1}}>
        <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/outdoors-v12">
            <Camera ref={cameraRef} zoomLevel={16} centerCoordinate={coordinate} />

            
            {/* pin for tujuan lokasi */}
            <PointAnnotation
            id="coordinatPosition"
            coordinate={coordinate}
            anchor={{ x: 0.5, y: 1 }} // anchor bottom-center, agar “titik” di map tepat
            />
            
        </MapView>
    </View>
  )
}

export default LokasiWarung

const styles = StyleSheet.create({})