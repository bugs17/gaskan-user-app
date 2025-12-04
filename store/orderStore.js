import create from "zustand";

export const useOrderStore = create((set, get) => ({
  // === STATE ===
  orderId: null,
  items: [], // { id, name, price, quantity }
  note: "",
  deliveryAddress: { lat: null, lng: null },
  paymentMethod: "",
  status: "cart", // cart, pending, processing, completed, cancelled
  restaurant: null, // object restaurant
  driver: null, // object driver atau null
  deliveryFee: 0,
  promoCode: null,
  totalPrice: 0,
  paymentStatus: "pending", // pending, paid, failed
  statusStep: 1, // step 1-5 bottomsheet

  // === ACTIONS ===
  clearItems: () => set({ items: [] }),
  
  addItem: (item) => {
    set((state) => {
      const index = state.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        const newItems = [...state.items];
        newItems[index].quantity += item.quantity || 1;
        return { items: newItems };
      } else {
        return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
      }
    });
  },

  incrementItem: (id) => {
  set((state) => {
    const index = state.items.findIndex((i) => i.id === id);
    if (index >= 0) {
      const newItems = [...state.items];
      newItems[index].quantity += 1;
      return { items: newItems };
    }
    return {};
  });
  },

  decrementItem: (id) => {
    set((state) => {
      const index = state.items.findIndex((i) => i.id === id);
      if (index >= 0) {
        const newItems = [...state.items];
        if (newItems[index].quantity > 1) {
          newItems[index].quantity -= 1;
        } else {
          newItems.splice(index, 1);
        }
        return { items: newItems };
      }
      return {};
    });
  },


  updateItemQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  getItemQuantity: (id) => {
    const state = get();
    const item = state.items.find(i => i.id === id);
    return item ? item.quantity : 0;
  },

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((sum, i) => sum + i.quantity, 0);
  },



  setNote: (note) => set({ note }),
  setDeliveryAddress: (lat, lng) => set({ deliveryAddress: { lat, lng } }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setStatus: (status) => set({ status }),
  setRestaurant: (restaurant) => set({ restaurant }),
  attachDriver: (driver) => set({ driver }),
  detachDriver: () => set({ driver: null }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setDeliveryFee: (fee) => set({ deliveryFee: fee }),
  setPromoCode: (code) => set({ promoCode: code }),
  setTotalPrice: (price) => set({ totalPrice: price }),
  setStatusStep: (step) => set({ statusStep: step }),

  resetOrder: () =>
    set({
      orderId: null,
      items: [],
      note: "",
      deliveryAddress: { lat: null, lng: null },
      paymentMethod: "",
      status: "cart",
      restaurant: null,
      driver: null,
      deliveryFee: 0,
      promoCode: null,
      totalPrice: 0,
      paymentStatus: "pending",
      statusStep: 1,
    }),

  getTotalPrice: () => {
    const state = get();
    const itemsTotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return itemsTotal + state.deliveryFee - (state.promoCode?.discount || 0);
  },
}));
