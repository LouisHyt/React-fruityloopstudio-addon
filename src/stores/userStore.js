import { create } from 'zustand'

const userStore = (set, get) => ({
    userInfos: null,
	setUserInfos: (value) => set((state) => ({userInfos: value}))
})

export const useUserStore = create(userStore); 