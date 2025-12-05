import React, { useCallback, useRef, useState } from 'react';
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
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useRouter } from 'expo-router';
import { KeyboardProvider, KeyboardAwareScrollView, KeyboardToolbar, useKeyboardAnimation, useKeyboardHandler } from 'react-native-keyboard-controller';

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
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const [paddingBotomInput, setPaddingBotomInput] = useState(inset.bottom + 20);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const scrollToBottom = useCallback(({ animated = true } = {}) => {
    if (!listRef.current) return;
    try {
      listRef.current.scrollToIndex({ index: Math.max(messages.length - 1, 0), animated });
    } catch (e) {
      if (typeof listRef.current.scrollToEnd === 'function') {
        listRef.current.scrollToEnd({ animated });
      }
    }
  }, [messages.length]);

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
      avatar: 'https://via.placeholder.com/64/34C759/FFFFFF?text=U',
    };

    setMessages((p) => [...p, newMessage]);
    setText('');

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' } : m))
      );
    }, 900);

    // Scroll to bottom after sending
    setTimeout(() => scrollToBottom(), 100);
  }, [text]);

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
      }
    }
}, []);

const [bottomPaddingState, setBottomPaddingState] = useState(inset.bottom);




  return (
    <KeyboardProvider>
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
        <KeyboardAwareScrollView
          bottomOffset={62}
          contentContainerStyle={{  paddingHorizontal: 16, paddingTop: 16,paddingBottom: bottomPaddingState, }}
          onKeyboardDidShow={scrollToBottom}
          
        >
          <FlashList
            ref={listRef}
            data={messages}
            renderItem={renderItem}
            estimatedItemSize={80}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
          />
        </KeyboardAwareScrollView>

        {/* Input & Send Button */}
        <Animated.View style={[{ flexDirection: 'row', alignItems: 'flex-end', padding: 10, backgroundColor: THEME.card }, animatedBottomPadding]}>
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
        </Animated.View>

        <Animated.View style={fakeView} />
      
      </SafeAreaView>
    </KeyboardProvider>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
});
