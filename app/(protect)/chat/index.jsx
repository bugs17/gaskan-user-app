import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import {  useKeyboardHandler } from 'react-native-keyboard-controller';
import {Fonts} from '../../../constants/Fonts'

// Theme
const THEME = {
  primary: '#8A63F6',
  card: '#FFFFFF',
  background: '#F7F7FB',
  text: '#111111',
  muted: '#6B7280',
};

// Dummy messages
const initialMessages = [
  {
    id: 'm1',
    type: 'text',
    text: 'Halo, driver saya sedang dalam perjalanan.',
    fromMe: false,
    time: '10:03',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
  {
    id: 'm2',
    type: 'text',
    text: 'Oke, saya tunggu di depan toko ya.',
    fromMe: true,
    time: '10:04',
    status: 'sent',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',
  },
  {
    id: 'm3',
    type: 'image',
    image: 'https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
  {
    id: 'm4',
    type: 'text',
    text: 'Oke, saya tunggu di depan toko ya.',
    fromMe: true,
    time: '10:04',
    status: 'sent',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',
  },
  {
    id: 'm5',
    type: 'image',
    image: 'https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
  {
    id: 'm6',
    type: 'text',
    text: 'Oke, saya tunggu di depan toko ya.',
    fromMe: true,
    time: '10:04',
    status: 'sent',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',
  },
  {
    id: 'm7',
    type: 'image',
    image: 'https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
  {
    id: 'm8',
    type: 'text',
    text: 'Oke, saya tunggu di depan toko ya.',
    fromMe: true,
    time: '10:04',
    status: 'sent',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',
  },
  {
    id: 'm9',
    type: 'image',
    image: 'https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
  {
    id: 'm10',
    type: 'text',
    text: 'Oke, saya tunggu di depan toko ya.',
    fromMe: true,
    time: '10:04',
    status: 'sent',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',
  },
  {
    id: 'm11',
    type: 'image',
    image: 'https://wiratech.co.id/wp-content/uploads/2025/10/Cara-Membuat-Pizza.webp',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
];


const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: event => {
        'worklet';
        height.value = Math.max(event.height, 0);
      },
    },
    []
  );
  return { height };
};

// Chat Screen
export default function Index() {
  const [messages, setMessages] = useState(initialMessages);
  const [showToolbar, setShowToolbar] = useState(false);
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const scrollToBottom = useCallback(({ animated = true } = {}) => {
    if (messages.length === 0) return;

    try {
        listRef.current.scrollToIndex({
          index: messages.length + 4,
          animated,
          // viewPosition: 1, // pastikan item muncul di bawah
        });
    } catch (e) {
      if (typeof listRef.current.scrollToEnd === 'function') {
        listRef.current.scrollToEnd({ animated });
      }
    }
  }, [messages.length]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      scrollToBottom(true);
      setShowToolbar(true)
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      scrollToBottom(true);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [scrollToBottom]);


  const handleSend = useCallback(() => {
    if (!text.trim()) return;

    scale.value = withSpring(0.9);
    setTimeout(() => (scale.value = withSpring(1)), 120);

    const newMessage = {
      id: String(Date.now()),
      type: 'text',
      text: text.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukZl5-j4v24rqiE6nZtDBmE_yphGNA2ME5pzji1kZwhZQ6nNJVscGWrYh-rSEaMmRmMxvoGyeVxPcitlpGUgDyy1_dqVlRBCOWxVPe9Kh&s=10',

    };

    setMessages((p) => [...p, newMessage]);
    setText('');

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' } : m))
      );
      scrollToBottom(true);
    }, 100);

  }, [text, scrollToBottom]);

  const renderItem = useCallback(({ item }) => <MessageBubble item={item} />, []);

  const { height } = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
    };
  }, []);

  const bottomPadding = useSharedValue(inset.bottom + 20);

  const animatedBottomPadding = useAnimatedStyle(() => ({
    paddingBottom: withTiming(bottomPadding.value, { duration: 250 }),
  }));

  useKeyboardHandler({
    onMove: (event) => {
      'worklet';
      if (event.height === 0) {
        bottomPadding.value = inset.bottom + 20;
      } else {
        bottomPadding.value = 20;
        runOnJS(() => scrollToBottom())
      }
    }
  }, []);

  const handleKeyboardDismisByToolbar = () => {
    Keyboard.dismiss()
    setShowToolbar(false)
  }





  return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <StatusBar style="dark" backgroundColor={THEME.primary + '30'} translucent />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <ArrowLeftIcon size={20} color={THEME.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Image source={{ uri: initialMessages[0].avatar }} style={styles.headerAvatar} />
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.headerTitle}>Kurir - Agus</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="call-outline" size={20} color={THEME.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat List */}
          <FlatList
            ref={listRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20, }}
          />

        {/* Input & Send Button */}
        <Animated.View style={[{gap:10,  padding: 10, backgroundColor: THEME.card,boxShadow: "0px -12px 8px rgba(0,0,0,0.12)",  }, animatedBottomPadding]}>
          {showToolbar && (
            <Pressable onPress={handleKeyboardDismisByToolbar} style={{alignItems:'center', width:'100%', flexDirection:'row', justifyContent:'flex-end', gap:4 }}>
              <Text style={{color:THEME.primary, fontFamily:Fonts.semibold}}>Tutup</Text>
              <ChevronDownIcon size={24} strokeWidth={2} color={THEME.primary} />
            </Pressable>
          )}

          <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="camera-outline" size={22} color={THEME.primary} />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              value={text}
              onChangeText={setText}
              placeholder="Tulis pesan..."
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              multiline
            />

            <Animated.View style={[styles.sendWrap, animatedStyle]}>
              <Pressable onPress={handleSend} hitSlop={8} style={styles.sendBtnPressable}>
                <View style={styles.sendBtn}>
                  <Ionicons name="send" size={18} color="#fff" />
                </View>
              </Pressable>
            </Animated.View>
          </View>

        </Animated.View>

        <Animated.View style={fakeView} />
      
      </SafeAreaView>
  );
}

function MessageBubble({ item }) {
  const isMe = item.fromMe;
  return (
    <View style={[styles.messageRow, isMe ? styles.rowRight : styles.rowLeft]}>
      {!isMe && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      <View style={[styles.bubbleWrap, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        {item.type === 'text' ? (
          <Text style={[styles.bubbleText, isMe ? styles.textMe : styles.textThem]}>{item.text}</Text>
        ) : (
          <Image source={{ uri: item.image }} style={styles.messageImage} />
        )}
        <View style={styles.metaRow}>
          <Text style={styles.timeText}>{item.time}</Text>
          {isMe && <Text style={styles.statusText}>{item.status === 'delivered' ? '✓✓' : '✓'}</Text>}
        </View>
      </View>
      {isMe && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
    </View>
  );
}

// Styles sama seperti sebelumnya
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: THEME.background },
  header: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.primary + '30',
    borderBottomWidth: 0.4,
    borderBottomColor: THEME.primary + '40',
    boxShadow: "0px 12px 8px rgba(0,0,0,0.12)",
  },
  headerCenter: { flexDirection: 'column', alignItems: 'center' },
  headerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: THEME.card },
  headerTitle: { fontSize: 16, fontWeight: '600', color: THEME.text },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12, padding: 8, borderRadius: 10, backgroundColor: 'transparent' },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  avatar: { width: 36, height: 36, borderRadius: 10, backgroundColor: THEME.card, marginHorizontal: 8 },
  bubbleWrap: {
    maxWidth: '78%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: THEME.card,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.12)",
  },
  bubbleMe: { backgroundColor: THEME.primary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: THEME.card, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 20 },
  textMe: { color: '#FFFFFF' },
  textThem: { color: THEME.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 6 },
  timeText: { fontSize: 11, color: '#9CA3AF', marginRight: 6 },
  statusText: { fontSize: 11, color: '#E5E7EB' },
  messageImage: { width: 220, height: 140, borderRadius: 12, backgroundColor: '#eee' },
  attachBtn: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    borderRadius: 16,
    backgroundColor: THEME.card,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    fontSize: 15,
    color: THEME.text,
  },
  sendWrap: { marginLeft: 8 },
  sendBtnPressable: { borderRadius: 20 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.primary,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.12)",
  },
});
