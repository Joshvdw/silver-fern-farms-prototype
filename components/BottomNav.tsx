import React, { useState, useEffect, useRef } from 'react'
import useStore from '@/hooks/useStore';
import { getNextNum, getPrevNum } from '@/hooks/utils/utils';
import { useSpring, config, animated, to } from 'react-spring';
import { playSound } from '@/hooks/utils/audio';
import { setTimeout } from 'timers';
import principleData from '@/data/principleData';

export default function BottomNav() {

  const arrayLength = principleData.length - 1;
  const transitionTime = 5000

  const [principle, setPrinciple] = useStore(
    (state:any) => [state.principle, state.setPrinciple]
  )

  const [hoverLeft, setHoverLeft] = useState(false)
  const [hoverRight, setHoverRight] = useState(false)
  const [position, setPosition] = useState(650)
  const [hide, setHide] = useState(false)
  const [transition, setTransition] = useState(false)

  const [prevNum, setPrevNum] = useState(arrayLength)
  const [nextNum, setNextNum] = useState(0)
  const [navClick, setNavClick] = useState(false)
  
  const spotLight = useStore((state: any) => state.spotLight);
  const setSpotLight = useStore((state: any) => state.setSpotLight)
  const backToMap = useStore((state: any) => state.backToMap)
  const setBackToMap = useStore((state: any) => state.setBackToMap)
  const bottomNav = useStore((state: any) => state.bottomNav)
  const setBottomNav = useStore((state: any) => state.setBottomNav)
  
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const navLeft = useRef<HTMLDivElement>(null)
  const navRight = useRef<HTMLDivElement>(null)

  let clicked = false
  
  // if navigated from unity side
  useEffect(() => {
    if ((spotLight) && (!clicked)) {      
      setPrevNum(getPrevNum(principle))
      setNextNum(getNextNum(principle))
      disableNav()
    }
  }, [principle, spotLight])

  // if navigated from front-end
  function handleClick (direction: string) {
    if(!transition) {
      playSound('ui_click')
      setNavClick(true)
      clicked = true
      hideNav()
      
      if (direction == 'prev') {
        setPrinciple(getPrevNum(principle))
        setPrevNum(getPrevNum(prevNum))
        if (navClick) {
          setNextNum(getPrevNum(nextNum))
        }
        if (clicked) {
          setNextNum(getPrevNum(nextNum))
        }
      }
      
      if (direction == 'next') {
        console.log(navClick,'here');
        if (navClick) {
          setPrinciple(getNextNum(principle))
          setPrevNum(getNextNum(prevNum))
        }
        if (clicked) {
          setPrinciple(getNextNum(principle))
          setPrevNum(getNextNum(prevNum))
        }
        setNextNum(getNextNum(nextNum))
      }

      setBottomNav(false)
      setBackToMap(false)

      if (!spotLight) {
        setSpotLight(true)
        // playSound('transition')
      }
      disableNav()
    }
  }

  function hideNav() {
    if(navClick) {
      setHide(true)
      if (navLeft.current) {
        navLeft.current.style.display = 'none';
      }
      if (navRight.current) {
        navRight.current.style.display = 'none';
      }
      setTimeout(()=>{
        if (navLeft.current) {
          navLeft.current.style.display = 'block';
        }
        if (navRight.current) {
          navRight.current.style.display = 'block';
        }
        setHide(false)
      }, transitionTime)
    }
  }

  // make nav unclickable
  function disableNav() {
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
    }, transitionTime)
  } 

  // catch for map reset
  useEffect(() => {
    if ((backToMap) && (spotLight == false)) {         
      setNavClick(false)  
      clicked = false 
      setPrevNum(arrayLength)
      setNextNum(0)
      disableNav()
    }
  }, [backToMap])

  // get value for how far up the screen the nav should slide
  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const navHeight = bottomNavRef.current?.getBoundingClientRect().height;
    let newPosition = position

    if(navHeight) newPosition = (viewportHeight - navHeight) * .90
    setPosition(newPosition)
  }, [spotLight]);


  // react-springs
  const moveNav = useSpring({
    config: { 
      ...config.molasses,
      duration: transitionTime * .75
    },
    from: { 
      bottom: "0",
    },
    to: {
      bottom: spotLight ? `${position}px` : "0",
    }
  });

  const fadeGradient = useSpring({
    config: {
      ...config.molasses, 
      duration: transitionTime / 4  
    },
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
      background: hoverLeft && !transition ? "rgba(0, 0, 0, .75)" : "rgba(0, 0, 0, 0)",
    }
  });

  const blackFillRight = useSpring({
    config: { ...config.slow },
    from: { 
      background: "rgba(0, 0, 0, 0)",
    },
    to: {
      background: hoverRight && !transition ? "rgba(0, 0, 0, .75)" : "rgba(0, 0, 0, 0)",
    }
  });

  const paddingLeft = useSpring({
    config: { ...config.slow },
    from: { 
      paddingLeft: "0px",
    },
    to: {
      paddingLeft: hoverLeft && !transition ? "15px" : "0px",
    }
  });

  const paddingRight = useSpring({
    config: { ...config.slow },
    from: { 
      paddingRight: "0px",
    },
    to: {
      paddingRight: hoverRight && !transition ? "15px" : "0px",
    }
  });

  const moveTextRight = useSpring({
    config: { ...config.slow },
    from: { 
      marginRight: "-0px",
    },
    to: {
      marginRight: hoverLeft && !transition ? "-15px" : "-0px",
    }
  });

  const moveTextLeft = useSpring({
    config: { ...config.slow },
    from: { 
      marginLeft: "-0px",
    },
    to: {
      marginLeft: hoverRight && !transition ? "-15px" : "-0px",
    }
  });

  const fadeNav = useSpring({
    config: { ...config.molasses },
    from: { 
      opacity: "1",
    },
    to: {
      opacity: hide ? "0" : "1",
    }
  });
  
  return (
    <>
      <animated.div 
        className={`bottomnav_wrapper black_gradient`} 
        style={bottomNav == false ? fadeGradient : {opacity: '0'}}>
      </animated.div>
      <animated.div 
        className={`bottomnav_wrapper `} 
        style={bottomNav == false ? moveNav : {bottom: `${position}px`}}
        ref={bottomNavRef}
      >
        <animated.div className={`bottomnav_item ${!transition ? "pointer" : ""}`} 
          ref={navLeft}
          style={fadeNav}
          onClick={() => { 
            handleClick("prev");
          }}       
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
              <animated.p className="subheader subheader_bottomnav" style={{...moveTextRight, ...paddingLeft}}>
                {principleData[prevNum]}
              </animated.p>
            </div>          
          </div>
        </animated.div>
        <animated.div className={`bottomnav_item ${!transition ? "pointer" : ""}`}  
          style={fadeNav}
          ref={navRight}
          onClick={() => {
            handleClick("next");
          }}          
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
              </animated.div>
            </animated.div>
            <div className="spotlightnav_title_container title_right">
              <animated.p className="subheader subheader_bottomnav" style={{...moveTextLeft, ...paddingRight}}>
                {principleData[nextNum]}
              </animated.p>
            </div>      
          </div>
        </animated.div>
      </animated.div>
    </>
  )
}
