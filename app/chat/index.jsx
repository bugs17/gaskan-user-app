import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import {  ArrowLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import { Fonts } from '../../constants/Fonts';
import { useRouter } from 'expo-router';

// Theme
const THEME = {
  primary: '#8A63F6',
  card: '#FFFFFF',
  background: '#F7F7FB',
  text: '#111111',
  muted: '#6B7280',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.10)'
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
    type: 'text',
    text: 'oke oke',
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
    type: 'text',
    text: 'oke oke',
    fromMe: false,
    time: '10:06',
    status: 'delivered',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT791OED1ln4Ufl2oa6sQXnHop3auJdBC3iqKY8E_9Amh-NxYtjWzJ1uIFnAwinAkE9LeZX7a6ouxCPeVFwEXpj7457byhqcgVeqj_RJzsnmQ&s=10',
  },
];

export default function Index({ navigation }) {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const keyboardOpenRef = useRef(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const route = useRouter()

  const inset = useSafeAreaInsets()

  // small send button animation
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      keyboardOpenRef.current = true;
      setIsKeyboardOpen(true)
      scrollToBottom({ animated: true });
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false)
        keyboardOpenRef.current = false;
    });


    // auto-scroll to bottom when messages change
    const timeout = setTimeout(() => scrollToBottom({ animated: false }), 80);

    return () => {
      show.remove();
      hide.remove();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    // whenever messages change, scroll to bottom
    scrollToBottom({ animated: true });
  }, [messages]);

  const scrollToBottom = useCallback(({ animated = true } = {}) => {
    if (!listRef.current) return;
    try {
      listRef.current.scrollToIndex({ index: Math.max(messages.length - 1, 0), animated });
    } catch (e) {
      // safe fallback to scrollToEnd
      if (typeof listRef.current.scrollToEnd === 'function') {
        listRef.current.scrollToEnd({ animated });
      }
    }
  }, [messages.length]);

  const handleSend = useCallback(() => {
    if (text.trim().length === 0) return;
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

    // simulate delivered after a bit
    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' } : m)));
    }, 900);
  }, [text]);

  const renderItem = useCallback(({ item }) => {
    return <MessageBubble item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={[ 'top' ]}>
    <StatusBar
        style="dark"
        backgroundColor={THEME.primary + '30'}
        translucent
    />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => route.back()} style={styles.iconBtn}>
                <ArrowLeftIcon size={20} color={THEME.primary} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
            <Image source={{ uri: initialMessages[0].avatar }} style={styles.headerAvatar} />
            <View style={{ marginBottom:10 }}>
                <Text style={styles.headerTitle}>Kurir - Agus</Text>
            </View>
            </View>

            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="call-outline" size={20} color={THEME.primary} />
                </TouchableOpacity>
            
            </View>
        </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 78}
      >
        <FlashList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          estimatedItemSize={120}
          keyExtractor={(i) => i.id}
          contentContainerStyle={[styles.listContent, {paddingBottom:isKeyboardOpen ? inset.bottom  : 16}]}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={() => {
            // ignore
          }}
        />

        <View
            style={[
                styles.inputWrap,
                Platform.OS === 'ios'
                ? { paddingBottom: inset.bottom + 10 }
                : { paddingBottom: 10 },
                isKeyboardOpen ? {gap:12} : {gap:0}
            ]}
            >
            {isKeyboardOpen && (
                <TouchableOpacity onPress={Keyboard.dismiss} style={{flexDirection:'row', justifyContent:'flex-end', marginRight:16, marginTop:12}}>
                    <Text style={{color:THEME.primary, fontFamily:Fonts.semibold, fontSize:18}}>Tutup</Text>
                </TouchableOpacity>
            )}
            <View style={{flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingHorizontal: 12,
                        paddingVertical: 10,}}>
                <TouchableOpacity style={styles.attachBtn} onPress={() => { /* open image picker */ }}>
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
                    onSubmitEditing={() => {
                    // prevent newline submit on Android
                    }}
                />

                <Animated.View style={[styles.sendWrap, animatedStyle]}>
                    <Pressable onPress={handleSend} hitSlop={8} style={styles.sendBtnPressable}>
                    <View style={styles.sendBtn}>
                        <Ionicons name="send" size={18} color="#fff" />
                    </View>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
      </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: THEME.primary + '30',
    borderBottomWidth: 0.4,
    borderBottomColor: THEME.primary + '40',

    // ONLY THIS — Clean, Modern, Apple-Grade
    // boxShadow: '0px 4px 14px rgba(0,0,0,0.18)',
    boxShadow: '0px 10px 8px rgba(0,0,0,0.18)'
    },
  headerCenter: { flexDirection: 'column', alignItems: 'center' },
  headerAvatar: { width: 44, height: 44, borderRadius: 44 / 2, backgroundColor: THEME.card },
  headerTitle: { fontSize: 16, fontWeight: '600', color: THEME.text },
  headerSubtitle: { fontSize: 12, color: THEME.muted },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12, padding: 8, borderRadius: 10, backgroundColor: 'transparent' },

  container: { flex: 1 },
  listContent: { paddingTop: 16, paddingHorizontal: 16 },

  // Message row
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },

  avatar: { width: 36, height: 36, borderRadius: 10, backgroundColor: THEME.card, marginHorizontal: 8 },

  bubbleWrap: {
    maxWidth: '78%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: THEME.card,
    // shadow (iOS) and elevation (Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    boxShadow: THEME.boxShadow,
    // note: React Native stylesheet doesn't support CSS `boxShadow` property.
    // We keep THEME.boxShadow for design reference but do not inject it here.
  },

  bubbleMe: {
    backgroundColor: THEME.primary,
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: THEME.card,
    borderBottomLeftRadius: 4,
  },

  bubbleText: { fontSize: 15, lineHeight: 20 },
  textMe: { color: '#FFFFFF' },
  textThem: { color: THEME.text },

  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 6 },
  timeText: { fontSize: 11, color: '#9CA3AF', marginRight: 6 },
  statusText: { fontSize: 11, color: '#E5E7EB' },

  messageImage: { width: 220, height: 140, borderRadius: 12, backgroundColor: '#eee' },

  inputWrap: {
    
    borderTopWidth: 0,
    backgroundColor: THEME.card,
    boxShadow: '0px -10px 8px rgba(0,0,0,0.18)'
  },

  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

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
    // shadow like design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
});
