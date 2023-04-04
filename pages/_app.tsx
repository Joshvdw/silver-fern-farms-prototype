import React, { useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import '@/styles/globals.scss'
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
import { playSound } from "@/utils/audio";

export default function App() {

  // react-unity-webgl config
  const { unityProvider, sendMessage, addEventListener, removeEventListener  } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data",
    frameworkUrl: "/Build/Build.framework.js",
    codeUrl: "/Build/Build.wasm",
  });

  // global state management for interactions
  const welcomeScreen = useStore((state: any) => state.welcomeScreen);
  const spotLight = useStore((state: any) => state.spotLight);
  const hamburgerMenu = useStore((state: any) => state.hamburgerMenu);
  const backToMap = useStore((state: any) => state.backToMap);
  const setBackToMap = useStore((state: any) => state.setBackToMap)
  const principle = useStore((state: any) => state.principle)
  const openPrinciple = useStore((state: any) => state.openPrinciple)
  const setSpotLight = useStore((state: any) => state.setSpotLight)

  // send messages to Unity Build
  useEffect(() => {
    if (!welcomeScreen) {
      sendMessage("Spotlight_Manager", "map_intro")   
    }
  }, [welcomeScreen])

  useEffect(() => {
    if (spotLight) {
      sendMessage("Spotlight_Manager", "open_spotlight", `${principle.toString()}`)   
    }
  }, [spotLight, principle])

  useEffect(() => {
    if (backToMap == true) {
      sendMessage("Spotlight_Manager", "return_to_map")   
    }
  }, [backToMap])

  // handle spotlight open functionality
  const openSpotlight = useCallback((principle: any) => {
    setSpotLight(true)
    setBackToMap(false)
    playSound('ui_click')
    playSound('transition')
  }, []);

  // event listeners for Unity functions
  useEffect(() => {
    addEventListener("PageOpen", openSpotlight);
    return () => {
      removeEventListener("PageOpen", openSpotlight);
    };
  }, [addEventListener, removeEventListener, openSpotlight]);
  
  return ( 
    <>
      <div className="main">
        {/* <LandingPage /> */}
        <Sound />

      {welcomeScreen && (
        <WelcomeScreen />
      )}

        {!welcomeScreen && (
          <>
            <TopNav />
            {!openPrinciple && (
              <BottomNav />
            )}
          </>
        )}
         
        {openPrinciple && (
          <>
          <PrinciplePage page={principle}/> 
          </>
        )}

        {((spotLight) && (!openPrinciple))&& (
          <SpotlightFooter />
        )}

        {hamburgerMenu && (
          <MainMenu />
        )}
      </div>
      <MuteLottie />
      <Unity unityProvider={unityProvider} className="unity_canvas"/>
    </>
  )
}