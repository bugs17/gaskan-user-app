import { ScrollView } from 'react-native'
import CategoryCard from './Category-card-home'
import { useSafePush } from '../utils/useSafePush'

const QuickMenu = () => {
  const push = useSafePush()
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 12, paddingBottom:10 }}
        >
            <CategoryCard onPress={() => push({pathname:"/menu", params:{category:"Makanan"}})} label="Makanan" icon="🍛" />
            <CategoryCard onPress={() => push({pathname:"/menu", params:{category:"Minuman"}})} label="Minuman" icon="🥤" />
            <CategoryCard onPress={() => push({pathname:"/menu", params:{category:"Cemilan"}})} label="Cemilan" icon="🍪" />
            <CategoryCard onPress={() => push({pathname:"/menu", params:{category:"By Warung"}})} label="By Warung" icon="🏬" />
    </ScrollView>

  )
}

export default QuickMenu