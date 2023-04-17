import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import PrinciplePage from "@/components/PrinciplePage";
import LandingPage from "@/components/LandingPage";
import MuteLottie from "@/components/UI/MuteLottie";
import useStore from "@/hooks/useStore";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import MainMenu from "@/components/MainMenu";
import SpotlightFooter from "@/components/SpotlightFooter";
import WelcomeScreen from "@/components/WelcomeScreen";
import Sound from "@/components/Sound";
import { playSound } from "@/hooks/utils/audio";
import Loader from "@/components/Loader";

export default function App() {


  // global state management for interactions
  const setLandingPage = useStore((state: any) => state.setLandingPage);
  const videoSequence = useStore((state: any) => state.videoSequence);
  const welcomeScreen = useStore((state: any) => state.welcomeScreen);
  const spotLight = useStore((state: any) => state.spotLight);
  const hamburgerMenu = useStore((state: any) => state.hamburgerMenu);
  const backToMap = useStore((state: any) => state.backToMap);
  const setBackToMap = useStore((state: any) => state.setBackToMap);
  const principle = useStore((state: any) => state.principle);
  const openPrinciple = useStore((state: any) => state.openPrinciple);
  const setSpotLight = useStore((state: any) => state.setSpotLight);


  return (
    <div className="main">
      <LandingPage />
    </div>
  );
}
