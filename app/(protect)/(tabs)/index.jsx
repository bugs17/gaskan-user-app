import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderHome from '../../../components/Header-home';
import SearchPressable from '../../../components/Search-home';
import InfoCard from '../../../components/CardPromo-home';
import QuickMenu from '../../../components/Quick-menu';
import PrommoSection from '../../../components/Promo-section';
import FancyFloatingCart from '../../../components/Floating-chart-button';
import {useSafePush} from '../../../utils/useSafePush'
import CartBottomSheet from '../../../components/bottom-sheet/CartBottomSheet';
import { useEffect, useRef } from 'react';



export default function TabOneScreen() {
  const push = useSafePush()
  const bottomSheetRef = useRef(null);

  useEffect(() => {
      bottomSheetRef.current?.close()
    }, [])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{paddingTop:10}}>
          <SearchPressable onPress={() => push({pathname:"/menu", params:{category:"Makanan"}})} />
          <View style={styles.separator} />
          <InfoCard />
          <View style={styles.separator} />
          <QuickMenu />
          
          <PrommoSection />
      </ScrollView>

      <FancyFloatingCart onCartPres={() => bottomSheetRef.current?.present()} />
      <CartBottomSheet ref={bottomSheetRef} />
        
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

