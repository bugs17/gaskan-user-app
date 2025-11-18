import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Fonts } from '../../constants/Fonts';
import { ChevronRightIcon, BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import Makanan from '../../assets/images/makanan.jpeg'

// Contoh data makanan
const orderItems = [
  {
    id: '1',
    name: 'Nasi Goreng Ikan Asin',
    qty: 2,
    price: 20000,
    image: Makanan,
  },
  {
    id: '2',
    name: 'Ayam Geprek',
    qty: 1,
    price: 15000,
    image: Makanan,

  },
  {
    id: '3',
    name: 'Es Teh Manis',
    qty: 3,
    price: 5000,
    image: Makanan,
  },
];

const CardOrderBig = () => {
    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const deliveryFee = 12000;
    const finalPayment = totalPrice + deliveryFee;

    const renderItem = ({ item, index }) => (
        <View style={[styles.itemRow, index === orderItems.length - 1 && { borderBottomWidth: 0 }]}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetail}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQtyPrice}>
            {item.qty} x Rp. {item.price.toLocaleString()}
            </Text>
        </View>
        </View>
    );

    return (
        <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
            <View style={{flexDirection:'row', gap:6, alignItems:"center"}}>
                <BuildingStorefrontIcon size={24} color={'#8E8E93'} />
                <Text style={styles.storeName}>Warung Sate Pak Joko</Text>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>Sedang diambil</Text>
            </View>
        </View>

        {/* Body: List Items */}
        <FlatList
            data={orderItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // height auto mengikuti jumlah item
            style={styles.listContainer}
        />

        {/* Footer */}
        <TouchableOpacity style={styles.footer} onPress={() => {}}>
            <View>
                <Text style={styles.totalText}>Total: Rp. {totalPrice.toLocaleString()}</Text>
                <Text style={styles.subText}>Ongkir: Rp. {deliveryFee.toLocaleString()}</Text>
                <Text style={styles.payCourier}>Bayar ke kurir: Rp. {finalPayment.toLocaleString()}</Text>
            </View>

            <ChevronRightIcon color="#8E8E93" size={22} />
        </TouchableOpacity>
        </View>
    );
};

export default CardOrderBig;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
    borderColor: "rgba(0,0,0,0.04)",
    borderWidth: 1,
    },
  header: {
    marginBottom: 18,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  storeName: {
    fontSize: 18,
    fontFamily: Fonts.semibold,
    color: '#000',
  },
  listContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom:4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)', // Apple subtle separator
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  itemDetail: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    color: '#000',
  },
  itemQtyPrice: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#6b7280',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    color: '#000',
  },
  subText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#6b7280',
    marginTop: 2,
  },
  payCourier: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    color: '#000',
    marginTop: 4,
  },
  
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F8E7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily:Fonts.regular,
    color: "#34C759",
  },
});
