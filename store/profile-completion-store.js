import { create } from 'zustand'

export const useProfileCompletionStore = create((set, get) => ({
  // ===== STATE =====
  step: 1,
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  coordinates:{
      longitude: null, 
      latitude: null
    },

  // ===== ACTIONS =====
  setAddress: (value) => set({address: value}),

  setCoordinates: (longitude, latitude) => set({
    coordinates:{
      longitude:longitude,
      latitude: latitude
    }
  }),

  setStep: (value) => set({ step: value }),

  setFirstName: (value) => set({ firstName: value }),

  setLastName: (value) => set({ lastName: value }),

  setPhone: (value) => set({ phone: value }),

  // set semua data sekaligus (opsional)
  setProfileData: ({ firstName, lastName, phone }) =>
    set({
      firstName,
      lastName,
      phone,
    }),

  // ambil semua data (helper)
  getProfileData: () => {
    const { firstName, lastName, phone } = get()
    return { firstName, lastName, phone }
  },

  // reset jika flow dibatalkan / selesai
  resetProfileData: () =>
    set({
      firstName: '',
      lastName: '',
      phone: '',
    }),
}))
