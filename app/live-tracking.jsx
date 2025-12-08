// import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeftIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid';
// import { Fonts } from '../constants/Fonts';
// import { useSafePush } from '../utils/useSafePush';
// import { useRouter } from 'expo-router';
// import LiveMap from '../components/map/Tracking-map';

// const LiveTracking = () => {
//     const push = useSafePush()
//     const router = useRouter()
  

//   // DATA driver sementara
//   const driver = {
//     name: "Budi Santoso",
//     vehicle: "B 4321 UYT - Honda Beat",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10",
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Pressable onPress={() => router.back()}>
//           <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
//         </Pressable>

//         <Text style={styles.title}>Live Tracking</Text>

//         <View style={{ width: 22 }} />
//       </View>

//       {/* MAP PLACEHOLDER */}
//       <View style={styles.mapPlaceholder}>
//         <Text style={{ color: '#666', fontFamily: Fonts.regular }}>
//           Map loading...
//         </Text>
//         {/* <LiveMap /> */}
//       </View>

//       {/* DRIVER CARD */}
//       <View style={styles.driverCard}>
        
//         <Image source={{ uri: driver.image }} style={styles.profileImage} />

//         <View style={{ flex: 1, marginLeft: 14 }}>
//           <Text style={styles.driverName}>{driver.name}</Text>
//           <Text style={styles.driverVehicle}>{driver.vehicle}</Text>
//         </View>

//         <Pressable
//           style={styles.chatButton}
//           onPress={() => push('/chat')}
//         >
//           <ChatBubbleLeftRightIcon size={22} color="#8E8E93" />
//         </Pressable>

//       </View>

//     </SafeAreaView>
//   );
// }


// export default LiveTracking


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F6F7",
//   },

//   // HEADER
//   header: {
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     paddingTop: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   title: {
//     fontFamily: Fonts.semibold,
//     color: "#000",
//     fontSize: 16,
//   },

//   // MAP
//   mapPlaceholder: {
//     flex: 1,
//     backgroundColor: "#DBDBDB",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },

//   // DRIVER CARD
//   driverCard: {
//     backgroundColor: "#FFF",
//     marginHorizontal: 16,
//     marginBottom: 16,
//     marginTop: 16,
//     padding: 16,
//     borderRadius: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "rgba(0,0,0,0.05)",
//     borderWidth: 1,
//     boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)"


//   },
//   profileImage: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//   },
//   driverName: {
//     fontFamily: Fonts.semibold,
//     fontSize: 16,
//     color: "#000",
//   },
//   driverVehicle: {
//     fontFamily: Fonts.regular,
//     fontSize: 14,
//     color: "#666",
//     marginTop: 2,
//   },
//   chatButton: {
//     padding: 8,
//     borderRadius: 12,
//   },
// });

import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Mapbox, { Camera, LineLayer, MapView, MarkerView, PointAnnotation, ShapeSource  } from '@rnmapbox/maps';
import MarkerDriver from '../assets/images/marker.png'
import { ArrowLeftIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid';
import { Fonts } from '../constants/Fonts';

import routeResponse from '../data/direction.json'
import { cropRoute } from '../utils/getRouteDriver';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSafePush } from '../utils/useSafePush';

// Mapbox.setAccessToken('pk.eyJ1IjoiYnVnczE3MDg5NCIsImEiOiJjbWl2cjhnaWcweDU0M2VyMW45cW5qcWY3In0.Oud9yLTN6ssfqsgmch9TJw');
Mapbox.setAccessToken('sk.eyJ1IjoiYnVnczE3MDg5NCIsImEiOiJjbWl1ZGo3ZXYwZTFiM2VwaXFwbGY0M3lwIn0.d9_02y0D-QxKVNMEAjyiBg');


  // DATA driver sementara
  const driver = {
    name: "Budi Santoso",
    vehicle: "B 4321 UYT - Honda Beat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10",
  };

const LiveTrackingScreen = () => {
  const router = useRouter()
  const push = useSafePush()
  // koordinat awal driver
  const [driverCoordinate, setDriverCoordinate] = useState([140.320556, -6.099069]);
  const [warungCoordinate, setWarungCoordinate] = useState([140.330025, -6.092943]);

  const insets = useSafeAreaInsets()

  //ini kita memanggil fungsi yang melakukan hit api direction pada mapbox
  // dan mengembalikan data yang kita butuhkan yaitu geometry coordinat dua titik antara titik A ke Titik B
  const routeData = routeResponse.routes[0].geometry.coordinates

  // disini kita melakukan logika untuk mengukur ulang jarak setiap kali posisi A berubah
  const remainingGeometry = cropRoute(
    routeData,
    [140.320556, -6.099069],
    [140.330025, -6.092943]
  );



  return (
    <View style={{flex:1}}>
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/outdoors-v12">
        <Camera  zoomLevel={16} centerCoordinate={driverCoordinate} />

        <MarkerView  id="driverView" coordinate={driverCoordinate}>
          <View style={{ height: 40, width: 40, justifyContent:'center', alignItems:'center' }}>
            <Image 
              source={MarkerDriver} 
              style={{ width: 40, height: 40 }} 
              resizeMode="contain" 
            />
          </View>
        </MarkerView>
        
        {/* pin for tujuan lokasi */}
        <PointAnnotation
          id="destinationLocation"
          coordinate={warungCoordinate}
          anchor={{ x: 0.5, y: 1 }} // anchor bottom-center, agar “titik” di map tepat
        />
        


        {routeData && (
          <ShapeSource
            id='routeSource'
            lineMetrics
            shape={{
              properties:{},
              type:'Feature',
              geometry:{
                type:'LineString',
                coordinates:remainingGeometry
              }
            }}
          >
            <LineLayer
              id='lineLayer'
              style={{
                lineColor:'#8A63F6',
                lineCap:'round',
                lineJoin:'round',
                lineWidth:5,
                
              }}

            />
          </ShapeSource>
        )}


      </MapView>

      {/* arrow back button */}
      <Pressable onPress={() => router.back()} style={[styles.backBtn, {top:insets.top + 20,}]}>
          <ArrowLeftIcon size={22} color="#fff" strokeWidth={2} />
      </Pressable>
        
        {/* DRIVER CARD */}
        <View style={[styles.driverCard, {bottom: insets.bottom + 10,}]}>
            <View style={{flexDirection: "row",}}>
              <Image source={{ uri: driver.image }} style={styles.profileImage} />

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverVehicle}>{driver.vehicle}</Text>
              </View>

              <Pressable
                style={styles.chatButton}
                onPress={() => push('/chat')}
              >
                <ChatBubbleLeftRightIcon size={22} color="#8E8E93" />
              </Pressable>
            </View>
            <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <DriverStageBadge stage={1} />
            </View>
        </View>
    </View>
  );
}



export default LiveTrackingScreen

const DriverStageBadge = ({ stage }) => {
  const label = stage === 1 ? 'Menuju Warung' : 'Menuju Tempatmu';

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pinText: { fontSize: 32 },
    driverCard: {
    backgroundColor: "#FFF",
    gap:8,
    padding: 16,
    borderRadius: 20,
    
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)",
    position:'absolute',
    left:20,
    right:20,
    zIndex:999


  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  driverName: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    color: "#000",
  },
  driverVehicle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  chatButton: {
    padding: 8,
    borderRadius: 12,
  },
  badgeContainer: {
    backgroundColor: '#8A63F6', // brand color kamu
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    fontFamily:Fonts.semibold
  },
  backBtn:{
    position:'absolute', 
    left:20, height:50, 
    width:50, 
    borderRadius:50/2, 
    backgroundColor:'#8A63F6', 
    justifyContent:'center', 
    alignItems:'center',
    boxShadow: "0px 6px 18px rgba(138, 99, 246, 0.55)",
  }
})
