import {  ScrollView } from 'react-native'
import PromoCard from './Promo-card'

const PrommoSection = () => {
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 8,      // beri ruang untuk shadow QuickMenu
          paddingBottom: 24,  // beri ruang agar section tidak mentok tabbar
          gap: 12,
        }}
      >
      <PromoCard />
      <PromoCard title="Promo spesial menanti!" emoji="🎉" />
      <PromoCard title="Diskon menu populer segera hadir!" emoji="🔥" />
    </ScrollView>

  )
}


export default PrommoSection