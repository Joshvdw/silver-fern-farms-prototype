import useStore from '@/hooks/useStore';
import { playSound } from '@/hooks/utils/audio';
import { useSwipe } from '@/hooks/utils/mobile';
import Link from 'next/link';
import React, { useRef } from 'react'
import { config, useSpring, animated } from 'react-spring';

export default function SpotlightFooter() {

  const setOpenPrinciple = useStore((state: any) => state.setOpenPrinciple)
  const bottomNav = useStore((state: any) => state.bottomNav)

  function handleClick () {
    setOpenPrinciple(true);
    playSound('ui_click');
  }

  const divRef = useRef<HTMLDivElement>(null);

  useSwipe({
    ref: divRef,
    onSwipeUp: () => {
      handleClick ()
    },
    onSwipeDown: () => {
      handleClick ()
    },
  });

  const slideUp = useSpring({
    // delay: 750,
    config: { 
      ...config.molasses, 
      // duration: 2000 
    },
    from: { bottom: '-50%' },
    to: { bottom: '-0%' }
  });  
  
  
  return (
    <animated.div className="spotlight_footer_wrapper pointer" ref={divRef} style={bottomNav == false ? slideUp : {bottom: "-0%"}}>
      {/* <Link href="/Principle"> */}
        <div className="footer_container" onClick={handleClick}>
          <div className="footer_text_container">
            <p className="footer_header">SLIDE TO VISIT</p>
            <p className="footer_text">LINDIS CROSSING STATION</p>
          </div>
          <div className="footer_btn_container">
            <img src="/svg/spotlight_footer_btn.svg" alt="Spotlight Button" />
          </div>
        </div>
      {/* </Link> */}
    </animated.div>
  )
}
