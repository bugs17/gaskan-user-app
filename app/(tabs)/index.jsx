import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderHome from '../../components/Header-home';
import SearchPressable from '../../components/Search-home';
import InfoCard from '../../components/CardPromo-home';
import QuickMenu from '../../components/Quick-menu';
import PrommoSection from '../../components/Promo-section';
import FloatingCartButton from '../../components/Floating-cart-button';
import { useRouter } from 'expo-router';



export default function TabOneScreen() {
  const cartCount = 0;
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <SearchPressable onPress={() => router.push("/menu")} />
          <View style={styles.separator} />
          <InfoCard />
          <View style={styles.separator} />
          <QuickMenu />
          
          <PrommoSection />

      </ScrollView>

      <FloatingCartButton
        visible={cartCount > 0}
        totalItems={cartCount}
        onPress={() => {}}
      />
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  separator: {
    marginVertical: 6,
    height: 1,
    width: '80%',
  },
});
