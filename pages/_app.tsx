import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "@/styles/globals.scss";
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
  // react-unity-webgl config
  // const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded  } = useUnityContext({
  //   loaderUrl: "/unity/BuildGzip.loader.js",
  //   dataUrl: "/unity/BuildGzip.data.gz",
  //   frameworkUrl: "/unity/BuildGzip.framework.js",
  //   codeUrl: "/unity/BuildGzip.wasm.gz",
  // });

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
    initialisationError,
  } = useUnityContext({
    loaderUrl: "/Build/Build_Gzip/BuildGzip.loader.js",
    dataUrl: "/Build/Build_Gzip/BuildGzip.data.gz",
    frameworkUrl: "/Build/Build_Gzip/BuildGzip.framework.js.gz",
    codeUrl: "/Build/Build_Gzip/BuildGzip.wasm.gz",
  });

  // const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression, isLoaded  } = useUnityContext({
  //   loaderUrl: "/Build/Build.loader.js",
  //   dataUrl: "/Build/Build.data",
  //   frameworkUrl: "/Build/Build.framework.js",
  //   codeUrl: "/Build/Build.wasm",
  // });

  // global state management for interactions
  const landingPage = useStore((state: any) => state.landingPage);
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

  // returning visitor state
  const [visited, setVisited] = useState("false");

  useEffect(() => {
    const siteState = window.sessionStorage.getItem("siteState");
    console.log(siteState);

    if (visited == "true") {
      sendMessage("Spotlight_Manager", "unity_open");
      setLandingPage(false);
    }
    if (siteState == "true") {
      setVisited("true");
    } else if (siteState == "false") {
      setVisited("false");
    }
  }, [visited, isLoaded]);

  // send messages to Unity Build
  useEffect(() => {
    if (!videoSequence) {
      sendMessage("Spotlight_Manager", "unity_open");
    }
  }, [videoSequence]);

  useEffect(() => {
    if (!welcomeScreen) {
      sendMessage("Spotlight_Manager", "map_intro");
    }
  }, [welcomeScreen]);

  useEffect(() => {
    if (spotLight) {
      sendMessage(
        "Spotlight_Manager",
        "open_spotlight",
        `${principle.toString()}`
      );
    }
  }, [spotLight, principle]);

  useEffect(() => {
    if (backToMap == true) {
      sendMessage("Spotlight_Manager", "return_to_map");
    }
  }, [backToMap]);

  // handle spotlight open functionality
  const openSpotlight = useCallback((principle: any) => {
    setSpotLight(true);
    setBackToMap(false);
    playSound("ui_click");
    playSound("transition");
  }, []);

  // event listeners for Unity functions
  useEffect(() => {
    addEventListener("PageOpen", openSpotlight);
    return () => {
      removeEventListener("PageOpen", openSpotlight);
    };
  }, [addEventListener, removeEventListener, openSpotlight]);

  useEffect(() => {
    console.log(initialisationError);
  }, [initialisationError]);

  return (
    <>
      <div className="main">
        <LandingPage />
        <Sound />

        {welcomeScreen && <WelcomeScreen />}

        {!welcomeScreen && (
          <>
            <TopNav />
            {!openPrinciple && <BottomNav />}
          </>
        )}

        {openPrinciple && (
          <>
            <PrinciplePage page={principle} />
          </>
        )}

        {spotLight && !openPrinciple && <SpotlightFooter />}

        {hamburgerMenu && <MainMenu />}
      </div>
      <MuteLottie />
      {!isLoaded && (
        <Loader loadingProgress={Math.round(loadingProgression * 100)} />
      )}
      <Unity
        unityProvider={unityProvider}
        className="unity_canvas"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
    </>
  );
}
