import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import MenuCard from '../../components/search-screen/Menu-card';
import SearchHeader from '../../components/search-screen/Search-header';
import CategoriesButton from '../../components/search-screen/Categories-button';
import PulseWaves from '../../components/Loading';
import { useRouter } from 'expo-router';




const dummyMenu = [
  { id: '1', name: 'Nasi Goreng', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '2', name: 'Es Teh Manis', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '3', name: 'Ayam Geprek', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '5', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: false },
  { id: '6', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '7', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '8', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
];

const MenuScreen = () => {
  const router = useRouter()
  const isLoading = false
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      
      {/* Search Input */}
      <SearchHeader />

      {/* Category Buttons */}
      <CategoriesButton />

      {isLoading ? (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <PulseWaves  />
          </View>
      ):(

      <FlashList
        data={dummyMenu}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={120} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingTop:10, paddingHorizontal:16 }}
        renderItem={({ item }) => (
          <MenuCard
            image={item.imageUrl}
            name={item.name}
            status={item.status}
            price={item.price}
            onPress={() => router.push({pathname:'/menu/' + item.id, params:{
              item: JSON.stringify(item),
            }})}
          />
        )}
      />
      )}

    </SafeAreaView>
  );
};

export default MenuScreen;


// ----------------------
// STYLES
// ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  
});
