import React, {useRef, useEffect, useState} from 'react'
import lottie from "lottie-web";
import mute_lottie from "@/public/lotties/mute_lottie.json";
import mute_lottie_off from "@/public/lotties/mute_lottie_off.json";
import mute_lottie_black from "@/public/lotties/mute_lottie_black.json";
import useStore from '@/hooks/useStore';
import { muteSounds, unMuteSound } from '@/hooks/utils/audio';

export default function MuteLottie() {

  const lottie_on = useRef<HTMLDivElement>(null);
  const lottie_off = useRef<HTMLDivElement>(null);
  
  const hamburgerMenu = useStore((state: any) => state.hamburgerMenu);
  const openPrinciple = useStore((state: any) => state.openPrinciple);
  const videoSequence = useStore((state: any) => state.videoSequence);

  const [playing, setPlaying] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.addEventListener("scroll", onScroll);    
    return () => {
      document.removeEventListener("scroll", onScroll);
    };  
  }, [])

  const onScroll = () => {
    setScrolled(true)
    if (window.pageYOffset==0) {
      setScrolled(false)
    }
  };

  useEffect(() => {
    const sound_anim = lottie.loadAnimation({
      container: lottie_on.current!,
      animationData: ((hamburgerMenu) || (((openPrinciple) && (scrolled))) ) ? mute_lottie_black : mute_lottie 
    });
    return () => sound_anim.destroy();
  }, [playing, hamburgerMenu, openPrinciple, scrolled, videoSequence])

  useEffect(() => {
    const sound_anim = lottie.loadAnimation({
      container: lottie_off.current!,
      animationData: mute_lottie_off
    });
    return () => sound_anim.destroy();
  }, [playing])

  function handleClick() {    
    setPlaying(!playing)
  }
  
  return (
    <div onClick={handleClick}>
      {((playing == false)) ?
        <div 
          ref={lottie_on} 
          className={`mute_lottie pointer ${hamburgerMenu ? 'center_lottie' : ''}`}
          style={ { bottom: videoSequence ? '5vh' : 'calc(100vw / 14 * .25)' } }
          onClick={() => muteSounds()}>
        </div>
      : 
        <div 
          ref={lottie_off} 
          className="mute_lottie pointer"
          style={ { bottom: videoSequence ? '5vh' : 'calc(100vw / 14 * .25)' } }
          onClick={() => unMuteSound()}>
        </div>
      }
    </div>
  )
}
