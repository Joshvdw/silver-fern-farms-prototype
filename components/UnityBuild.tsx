import React, { useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import useStore from "@/hooks/useStore";
import { playSound } from "@/hooks/utils/audio";
import Loader from "@/components/Loader";

export default function UnityBuild() {
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
    initialisationError,
  } = useUnityContext({
    loaderUrl: "/unity-build/BuildGzip.loader.js",
    dataUrl: "/unity-build/gzip/BuildGzip.data.gz",
    frameworkUrl: "/unity-build/gzip/BuildGzip.framework.js.gz",
    codeUrl: "/unity-build/gzip/BuildGzip.wasm.gz",
  });

  // global state management for interactions
  const [principle, setPrinciple] = useStore((state: any) => [
    state.principle,
    state.setPrinciple,
  ]);
  const welcomeScreen = useStore((state: any) => state.welcomeScreen);
  const videoSequence = useStore((state: any) => state.videoSequence);
  const spotLight = useStore((state: any) => state.spotLight);
  const backToMap = useStore((state: any) => state.backToMap);
  const setBackToMap = useStore((state: any) => state.setBackToMap);
  const setSpotLight = useStore((state: any) => state.setSpotLight);

  // const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // send messages to Unity Build
  useEffect(() => {
    if (isLoaded) {
      sendMessage("Spotlight_Manager", "unity_open");
    }
  }, [isLoaded])

  useEffect(() => {
    if (!videoSequence) {
      sendMessage("Spotlight_Manager", "unity_open");
    }
  }, [videoSequence])

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
  const openSpotlight = useCallback((p: any) => {    
    setPrinciple(Number(p));
    setSpotLight(true);
    setBackToMap(false);
    playSound("ui_click");
    // if (!isIOS) {
    //   playSound("transition");
    // } 
  }, []);

  // event listeners for Unity functions
  useEffect(() => {
    addEventListener("PageOpen", (p) => openSpotlight(p));
    return () => {
      removeEventListener("PageOpen", (p) => openSpotlight(p));
    };
  }, [addEventListener, removeEventListener, openSpotlight]);

  useEffect(() => {
    console.log(initialisationError);
  }, [initialisationError]);

  return (
    <>
      {!isLoaded && (
        <Loader loadingProgress={Math.round(loadingProgression * 100)} />
      )}
      <Unity
        unityProvider={unityProvider}
        className="unity_canvas"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
    </>
  )
}
