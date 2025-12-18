import { Tabs } from 'expo-router';
import { HomeIcon as HomeOutline, ReceiptPercentIcon as ReceiptPercentIconOutline, UserIcon as UserOutline } from "react-native-heroicons/outline";
import { HomeIcon as HomeSolid, ReceiptPercentIcon as ReceiptPercentIconSolid, UserIcon as UserSolid } from "react-native-heroicons/solid";
import TabbarButton from '../../../components/TabbarButton';




export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 110, // default sekitar 50, naikkan sesuai kebutuhan
            // paddingTop: 10, // tambahkan padding atas
            // paddingBottom: 10, // optional
          },
          tabBarButton: (props) => <TabbarButton {...props} />,
          animation:"shift"
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => {
            // Gunakan solid jika aktif, outline jika tidak aktif
            return focused ? (
              <HomeSolid size={32} color="#8A63F6" />
            ) : (
              <HomeOutline size={32} color="#000" />
            );
          },
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="pesanan"
        options={{
          tabBarIcon: ({ color, focused }) => {
            // Gunakan solid jika aktif, outline jika tidak aktif
            return focused ? (
              <ReceiptPercentIconSolid size={32} color="#8A63F6" />
            ) : (
              <ReceiptPercentIconOutline size={32} color="#000" />
            );
          },
          headerShown:false
        }}
      />
      
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ color, focused }) => {
            // Gunakan solid jika aktif, outline jika tidak aktif
            return focused ? (
              <UserSolid size={32} color="#8A63F6" />
            ) : (
              <UserOutline size={32} color="#000" />
            );
          },
          headerShown:false
        }}
      />
      
      
    </Tabs>
  );
}
