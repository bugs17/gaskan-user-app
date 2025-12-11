import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import MenuCard from '../../../components/search-screen/Menu-card';
import SearchHeader from '../../../components/search-screen/Search-header';
import CategoriesButton from '../../../components/search-screen/Categories-button';
import { useSafePush } from '../../../utils/useSafePush';
import FancyFloatingCart from '../../../components/Floating-chart-button';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import WarungCard from '../../../components/search-screen/Warung-Card';




const dummyMenu = [
  { id: '1', name: 'Nasi Goreng', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '2', name: 'Es Teh Manis', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '3', name: 'Ayam Geprek', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '5', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: false },
  { id: '6', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '7', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
  { id: '8', name: 'Kopi Susu', imageUrl: "https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp", price: "25000", status: true },
];

export const dummyWarung = [
  {
    id: 'w1',
    name: 'Warung Sari Rasa',
    imageUrl: 'https://via.placeholder.com/150/FFB6C1/000000?text=Warung+1',
    isOpen: true,
    rating: 4.7,
  },
  {
    id: 'w2',
    name: 'Warung Kopi Mantap',
    imageUrl: 'https://via.placeholder.com/150/87CEFA/000000?text=Warung+2',
    isOpen: false,
    rating: 4.5,
  },
  {
    id: 'w3',
    name: 'Warung Makan Enak',
    imageUrl: 'https://via.placeholder.com/150/FFA500/000000?text=Warung+3',
    isOpen: true,
    rating: 4.6,
  },
  {
    id: 'w4',
    name: 'Warung Cemilan Sehat',
    imageUrl: 'https://via.placeholder.com/150/90EE90/000000?text=Warung+4',
    isOpen: true,
    rating: 4.8,
  },
];


const MenuScreen = () => {
  const push = useSafePush()
  const params = useLocalSearchParams();

  const category = params.category || 'Makanan';

  const scrollRef = useRef(null);

  useEffect(() => {
    
    if (category === 'By Warung' || category === 'Cemilan') {
      scrollRef.current.scrollTo({ x: 300, animated: true })
    }
  },[])

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      
      {/* Search Input */}
      <SearchHeader  />

      {/* Category Buttons */}
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:60}} contentContainerStyle={{alignItems:'center'}}>
        <CategoriesButton pilih={category} />
      </ScrollView>

      <FlashList
      data={category === 'By Warung' ? dummyWarung : dummyMenu}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={120} 
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 100, paddingTop:10, paddingHorizontal:16 }}
      renderItem={({ item }) => {
        if(category === 'By Warung') {
          return (
            <WarungCard
              image={item.imageUrl}
              name={item.name}
              isOpen={item.isOpen}
              onPress={() => push({
                pathname: '/warung/' + item.id,
                params: { item: JSON.stringify(item) }
              })}
            />
          )
        }

        return (
          <MenuCard
            image={item.imageUrl}
            name={item.name}
            status={item.status}
            price={item.price}
            onPress={() => push({
              pathname:'/menu/' + item.id,
              params:{ item: JSON.stringify(item) }
            })}
          />
        )
      }}
    />

      <FancyFloatingCart />

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
  },

  
});
