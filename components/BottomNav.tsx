import React, { useState, useEffect, useRef } from 'react'
import useStore from '@/hooks/useStore';
import Arrow_Button from './UI/Arrow_Button'
import { principleCounter, calcPrevNum } from '@/utils/utils';
import { useSpring, config, animated, to } from 'react-spring';
import { playSound } from '@/utils/audio';
import { setTimeout } from 'timers';

export default function BottomNav() {

  const [hover, setHover] = useState(false)
  const [prevNum, setPrevNum] = useState(7)
  const [position, setPosition] = useState(650);

  const spotLight = useStore((state: any) => state.spotLight);
  const setSpotLight = useStore((state: any) => state.setSpotLight)
  const setBackToMap = useStore((state: any) => state.setBackToMap)
  const bottomNav = useStore((state: any) => state.bottomNav)
  const setBottomNav = useStore((state: any) => state.setBottomNav)

  const [principle, setPrinciple] = useStore(
    (state) => [state.principle, state.setPrinciple]
  )

  // catch for when principle page is reset
  useEffect(() => {
    if (principle == 0) {      
      setPrevNum(7)
    }
  }, [principle])
  
  function handleClick (direction: string) {
    playSound('ui_click')
    setPrinciple(principleCounter(direction, principle))  
    setPrevNum(calcPrevNum(direction, principle, prevNum))
    setBottomNav(false)
    setBackToMap(false)

    if (!spotLight) {
      setSpotLight(true)
      setTimeout(()=> {
        playSound('transition')
      }, 500)
    }
  }

  const moveNav = useSpring({
    config: { ...config.molasses },
    from: { 
      bottom: "0",
    },
    to: {
      bottom: spotLight ? `${position}px` : "0",
    }
  });

 const fadeGradient = useSpring({
    config: { ...config.molasses },
    from: { 
      opacity: "1",
    },
    to: {
      opacity: spotLight ? "0" : "1",
    }
  });

  const bottomNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      const viewportHeight = window.innerHeight;
      const navHeight = bottomNavRef.current?.getBoundingClientRect().height;
      let newPosition = position

      if(navHeight) newPosition = (viewportHeight - navHeight) * .95
      setPosition(newPosition)
  }, [spotLight]);
  
  return (
    <>
      <animated.div 
        className={`bottomnav_wrapper black_gradient`} 
        style={bottomNav == false ? fadeGradient : {opacity: '0'}}>
      </animated.div>
      <animated.div 
        className={`bottomnav_wrapper `} 
        style={bottomNav == false ? moveNav : {bottom: '650px'}}
        ref={bottomNavRef}
      >
        <div className="bottomnav_item pointer" 
          onClick={() => handleClick("prev")}       
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)} >
          <div className="spotlightnav_container spotlightnav_left">
            <div className="spotlightnav_btn_container">
              <Arrow_Button forward={false} state={hover}/>
              <div className="line_container">
                <div className="line_dummy"></div>
                <div className="border_top"></div>
              </div>
              <p className="num_text_container">No.{prevNum}</p>
            </div>
            <div className="spotlightnav_title_container title_left">
              <p className="subheader subheader_bottomnav">Principle Name Here</p>
            </div>          
          </div>
        </div>
        <div className="bottomnav_item pointer" 
          onClick={() => handleClick("next")}          
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)} >
          <div className="spotlightnav_container spotlightnav_right">
            <div className="spotlightnav_btn_container spotlight_btn_right">
              <p className="num_text_container">No. {principle == 7 ? 1 : principle + 1}</p>
              <div className="line_container">
                <div className="line_dummy"></div>
                <div className="border_top"></div>
              </div>
              <Arrow_Button forward state={hover}/>
            </div>
            <div className="spotlightnav_title_container">
              <p className="subheader subheader_bottomnav">Principle Name Here</p>
            </div>      
          </div>
        </div>
      </animated.div>
    </>
  )
}
