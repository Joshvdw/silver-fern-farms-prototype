import React, { useEffect } from "react";
import PrinciplePage from "@/components/PrinciplePage";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import MainMenu from "@/components/MainMenu";
import SpotlightFooter from "@/components/SpotlightFooter";
import WelcomeScreen from "@/components/WelcomeScreen";
import BlackMask from "@/components/UI/BlackMask";
import useStore from "@/hooks/useStore";


export default function Map() {

  const [principle, setPrinciple] = useStore((state: any) => [
    state.principle,
    state.setPrinciple,
  ]);
  const welcomeScreen = useStore((state: any) => state.welcomeScreen);
  const spotLight = useStore((state: any) => state.spotLight);
  const hamburgerMenu = useStore((state: any) => state.hamburgerMenu);
  const openPrinciple = useStore((state: any) => state.openPrinciple);

  return (
    <>
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
          <BlackMask />
        </>
      )}

      {spotLight && !openPrinciple && <SpotlightFooter />}

      {hamburgerMenu && <MainMenu />}
    </>
  )
}
