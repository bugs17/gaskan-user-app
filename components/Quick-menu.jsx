import { ScrollView } from 'react-native'
import CategoryCard from './Category-card-home'

const QuickMenu = () => {
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 12, paddingBottom:10 }}
        >
            <CategoryCard label="Makanan" icon="🍛" />
            <CategoryCard label="Minuman" icon="🥤" />
            <CategoryCard label="Cemilan" icon="🍪" />
            <CategoryCard label="Semua Menu" icon="🍽️" />
    </ScrollView>

  )
}

export default QuickMenu