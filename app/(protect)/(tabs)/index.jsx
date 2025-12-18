import { Redirect } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartBottomSheet from '../../../components/bottom-sheet/CartBottomSheet';
import InfoCard from '../../../components/CardPromo-home';
import FancyFloatingCart from '../../../components/Floating-chart-button';
import HeaderHome from '../../../components/Header-home';
import PrommoSection from '../../../components/Promo-section';
import QuickMenu from '../../../components/Quick-menu';
import SearchPressable from '../../../components/Search-home';
import { cekProfileCompletion } from '../../../utils/cek-user-profile-completion';
import { useSafePush } from '../../../utils/useSafePush';



export default function TabOneScreen() {
  const [isNewUser, setIsNewUser] = useState(true)
  const [isCheking, setIsCheking] = useState(true)
  const push = useSafePush()

  const bottomSheetRef = useRef(null);


  useEffect(() => {
      bottomSheetRef.current?.close()
  }, [])

  
  useEffect(() => {
    setIsCheking(true)
    const check = async () => {
      const res = await cekProfileCompletion()
      setIsNewUser(res)
      setIsCheking(false)
    }
    check()
  }, [])
  
  
  
  if (isCheking) return null
  
  if (isNewUser) {
    return <Redirect href={'/lengkapi-profil'} />
    
  }
  
  
  

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

