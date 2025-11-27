import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/pesanan/Header';
import CardOrder from '../../components/pesanan/Card-order';
import CourierCard from '../../components/pesanan/Card-kurir';
import EmptyStateView from '../../components/pesanan/No-order';


export default function Pesanan() {
  const order = true

  if (!order) {
    return <EmptyStateView />;
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <View style={styles.separator} />
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:12, flex:1}} contentContainerStyle={{gap:5, paddingTop:10}}>
        <CardOrder />
        <CourierCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    marginVertical: 6,
    height: 1,
    width: '80%',
  },
});
