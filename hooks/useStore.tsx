import { create } from "zustand";
interface globalStore {
  landingPage: boolean;
  setLandingPage: (state: boolean) => void;
  videoSequence: boolean;
  setVideoSequence: (state: boolean) => void;
  welcomeScreen: boolean;
  setWelcomeScreen: (state: boolean) => void;
  spotLight: boolean;
  setSpotLight: (state: boolean) => void;
  hamburgerMenu: boolean;
  setHamburgerMenu: (state: boolean) => void;
  backToMap: boolean;
  setBackToMap: (state: boolean) => void;
  principle: number;
  setPrinciple: (num: number | undefined) => void;
  openPrinciple: boolean;
  setOpenPrinciple: (state: boolean) => void;
  bottomNav: boolean;
  setBottomNav: (state: boolean) => void;
}

const useStore = create<globalStore>((set) => ({
  landingPage: true,
  setLandingPage: (state) => set(({ landingPage: state})),
  videoSequence: false,
  setVideoSequence: (state) => set(({ videoSequence: state})),
  welcomeScreen: true,
  setWelcomeScreen: () => set((state) => ({ welcomeScreen: !state.welcomeScreen})),
  spotLight: false,
  setSpotLight: (state) => set(({ spotLight: state})),
  hamburgerMenu: false,
  setHamburgerMenu: () => set((state) => ({ hamburgerMenu: !state.hamburgerMenu})),
  backToMap: false,
  setBackToMap: (state) => set(({ backToMap: state})),
  principle: 0,
  setPrinciple: (num) => set({ principle: num }),
  openPrinciple: false,
  setOpenPrinciple: (state) => set(({ openPrinciple: state})),
  bottomNav: false,
  setBottomNav: (state) => set(({ bottomNav: state})),
}))

export default useStore;