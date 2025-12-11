import { StyleSheet, Text, View } from 'react-native'
import { Camera, MapView, PointAnnotation } from '@rnmapbox/maps'

const MapPlaceHolder = ({coordinate}) => {
  return (
      
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/outdoors-v12">
        <Camera zoomLevel={16} centerCoordinate={coordinate} />
        {/* pin for tujuan lokasi */}
        <PointAnnotation
            id="coordinatPosition"
            coordinate={coordinate}
            anchor={{ x: 0.5, y: 1 }} // anchor bottom-center, agar “titik” di map tepat
        />
    </MapView>
  )
}

export default MapPlaceHolder

const styles = StyleSheet.create({})