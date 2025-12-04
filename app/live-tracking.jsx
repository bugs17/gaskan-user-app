import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid';
import { Fonts } from '../constants/Fonts';
import { useSafePush } from '../utils/useSafePush';
import { useRouter } from 'expo-router';

const LiveTracking = () => {
    const push = useSafePush()
    const router = useRouter()
  

  // DATA driver sementara
  const driver = {
    name: "Budi Santoso",
    vehicle: "B 4321 UYT - Honda Beat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10",
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={22} color="#000" strokeWidth={2} />
        </Pressable>

        <Text style={styles.title}>Live Tracking</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* MAP PLACEHOLDER */}
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#666', fontFamily: Fonts.regular }}>
          Map loading...
        </Text>
      </View>

      {/* DRIVER CARD */}
      <View style={styles.driverCard}>
        
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

    </SafeAreaView>
  );
}


export default LiveTracking


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },

  // HEADER
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: Fonts.semibold,
    color: "#000",
    fontSize: 16,
  },

  // MAP
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  // DRIVER CARD
  driverCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.10)"


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
});
