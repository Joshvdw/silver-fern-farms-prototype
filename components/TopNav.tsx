import React, { useState } from 'react'
import useStore from '@/hooks/useStore'
import { useSpring, animated, config } from 'react-spring';
import { playSound } from '@/hooks/utils/audio';

export default function TopNav() {

  const [hover, setHover] = useState(false)

  const spotLight = useStore((state: any) => state.spotLight);
  const setSpotLight = useStore((state: any) => state.setSpotLight)
  const setHamburgerMenu = useStore((state: any) => state.setHamburgerMenu)
  const setBackToMap = useStore((state: any) => state.setBackToMap)  
  const setPrinciple = useStore((state: any) => state.setPrinciple)
  const setOpenPrinciple = useStore((state: any) => state.setOpenPrinciple)
  const openPrinciple = useStore((state: any) => state.openPrinciple)
  const setBottomNav = useStore((state: any) => state.setBottomNav)
  const setPanoramicLoad = useStore((state: any) => state.setPanoramicLoad)

  function backToBlueprint () {
    playSound('ui_click')
    setSpotLight(false);
    setPrinciple(0);
    setBackToMap(true);
    setBottomNav(false);
  }

  function backToPrinciple () {
    setBottomNav(true);
    setOpenPrinciple(false);
    playSound('ui_click')
    setPanoramicLoad(false);
  }

  const fade = useSpring({
    delay: 100,
    config: { ...config.molasses },
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const hoverExpand = useSpring({
    config: { ...config.stiff },
    from: { height: '12px', marginTop: '0px'},
    to: { height: hover ? '20px' : '12px', marginTop: hover ? '-4px' : '0px'}
  });

  return (
    <div className='topnav_wrapper'>
      <div className="topnav_item topnav_back_container pointer" onClick={openPrinciple ? backToPrinciple : backToBlueprint}>
        {spotLight && (
          <>
            <div className="black_back_border pointer"></div>
              {openPrinciple
                ? <p className="blueprint_back_text">Back to principles</p>
                : <p className="blueprint_back_text">Back to blueprint</p>
              }
          </>
        )}
      </div>
      <div className="topnav_item topnav_logo_container">
        {!openPrinciple
          ? <img src="/svg/fern_logo_black.svg" alt="Black Fern Icon" />
          : <animated.img 
              src="/svg/fern_logo_black_white.svg" 
              alt="Fern Icon" 
              className="black_white_logo"
              style={{ ...fade}} 
            />
        }
      </div>
      <div className="topnav_item topnav_hamburger_container">
        <animated.div 
          className="hamburger_menu pointer" 
          style={hoverExpand}           
          onClick={() => {setHamburgerMenu(), playSound('ui_click')}} 
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)}>
        </animated.div>
      </div>
    </div>
  )
}
