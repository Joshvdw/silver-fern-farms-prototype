import React, { useState, useEffect, useRef } from 'react'
import useStore from '@/hooks/useStore';
import { principleCounter, calcPrevNum } from '@/hooks/utils/utils';
import { useSpring, config, animated, to } from 'react-spring';
import { playSound } from '@/hooks/utils/audio';
import { setTimeout } from 'timers';
import principleData from '@/data/principleData';

export default function BottomNav() {

  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)
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
    config: { 
      ...config.molasses,
      duration: 2500 
    },
    // delay: 250,
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

  const blackFillLeft = useSpring({
    config: { ...config.slow },
    from: { 
      background: "rgba(0, 0, 0, 0)",
    },
    to: {
      background: hoverLeft ? "rgba(0, 0, 0, .75)" : "rgba(0, 0, 0, 0)",
    }
  });

  const blackFillRight = useSpring({
    config: { ...config.slow },
    from: { 
      background: "rgba(0, 0, 0, 0)",
    },
    to: {
      background: hoverRight ? "rgba(0, 0, 0, .75)" : "rgba(0, 0, 0, 0)",
    }
  });

  const moveTextRight = useSpring({
    config: { ...config.slow },
    from: { 
      marginRight: "-0px",
    },
    to: {
      marginRight: hoverLeft ? "-15px" : "-0px",
    }
  });

  const moveTextLeft = useSpring({
    config: { ...config.slow },
    from: { 
      marginLeft: "-0px",
    },
    to: {
      marginLeft: hoverRight ? "-15px" : "-0px",
    }
  });

  const bottomNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      const viewportHeight = window.innerHeight;
      const navHeight = bottomNavRef.current?.getBoundingClientRect().height;
      let newPosition = position

      if(navHeight) newPosition = (viewportHeight - navHeight) * .90
      setPosition(newPosition)
  }, [spotLight]);

  let nextNum = principle == 7 ? 1 : principle + 1
  
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
          onMouseEnter={() => setHoverLeft(true)} 
          onMouseLeave={() => setHoverLeft(false)} >
          <div className="spotlightnav_container spotlightnav_left">
            <animated.div className="spotlightnav_btn_container"  style={moveTextRight}>
              <animated.div className="back_btn" style={blackFillLeft}>
                <img src="/svg/back_arrow.svg"  alt="Arrow icon for back button"  />
              </animated.div>
              <div className="line_container">
                <div className="line_dummy"></div>
                <div className="border_top"></div>
              </div>
              <animated.p className="num_text_container">
                 PREVIOUS
              </animated.p>
            </animated.div>
            <div className="spotlightnav_title_container title_left">
              <animated.p className="subheader subheader_bottomnav" style={moveTextRight}>{principleData[prevNum - 1]}</animated.p>
            </div>          
          </div>
        </div>
        <div className="bottomnav_item pointer" 
          onClick={() => handleClick("next")}          
          onMouseEnter={() => setHoverRight(true)} 
          onMouseLeave={() => setHoverRight(false)} >
          <div className="spotlightnav_container spotlightnav_right">
            <animated.div className="spotlightnav_btn_container spotlight_btn_right" style={moveTextLeft}>
              <animated.p className="num_text_container">
                NEXT
              </animated.p>
              <div className="line_container">
                <div className="line_dummy"></div>
                <div className="border_top"></div>
              </div>
              <animated.div className="back_btn" style={blackFillRight}>
                <img src="/svg/forward_arrow.svg" alt="Arrow icon for forward button"  />
              </animated.div>`
            </animated.div>
            <div className="spotlightnav_title_container title_right">
              <animated.p className="subheader subheader_bottomnav" style={moveTextLeft}>{principleData[nextNum - 1]}</animated.p>
            </div>      
          </div>
        </div>
      </animated.div>
    </>
  )
}
