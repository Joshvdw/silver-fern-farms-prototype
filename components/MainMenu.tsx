import useStore from '@/hooks/useStore'
import { useSpring, animated, config } from 'react-spring';
import { playSound } from '@/hooks/utils/audio'
import React, { useRef, useState } from 'react'
import Logo from './UI/Logo'
import { negativeFeedbackShake } from '@/hooks/utils/utils'

export default function MainMenu() {

  const [closeMenu, setCloseMenu] = useState(false)

  const setSpotLight = useStore((state: any) => state.setSpotLight)
  const setHamburgerMenu = useStore((state: any) => state.setHamburgerMenu)
  const setBackToMap = useStore((state: any) => state.setBackToMap)  
  const setPrinciple = useStore((state: any) => state.setPrinciple)
  const setOpenPrinciple = useStore((state: any) => state.setOpenPrinciple)
  const setBottomNav = useStore((state: any) => state.setBottomNav)
  const setPanoramicLoad = useStore((state: any) => state.setPanoramicLoad)

  function openMapView() {
    closeMenuTimer()
    setSpotLight(false);
    setOpenPrinciple(false);
    setBackToMap(true);
    setPrinciple(0);
    setBottomNav(false);
    setPanoramicLoad(false);
  }

  function closeMenuTimer() {
    playSound('ui_click')
    setCloseMenu(true)
    setTimeout(()=> {
      setHamburgerMenu();
    }, 1000)
  }

  const linkInactive = useRef<HTMLParagraphElement>(null)
  const linkInactive2 = useRef<HTMLParagraphElement>(null)
  const linkInactive3 = useRef<HTMLParagraphElement>(null)
  const linkInactive4 = useRef<HTMLParagraphElement>(null)
  const linkInactive5 = useRef<HTMLParagraphElement>(null)

  const pageSlideUp = useSpring({ 
    config: { ...config.slow },
    from: { marginTop: "100vh" },
    to: { marginTop: "0vh"}
  });

  const pageSlideDown = useSpring({ 
    config: { ...config.slow },
    from: { top: "0%" },
    to: { top: closeMenu ? "100%" : "0%"  }
  });
  
  return (
    <animated.div style={{...pageSlideUp, ...pageSlideDown}} className="mainmenu_wrapper">
      <div className="mainmenu_topnav">
        <div className="dummy topnav_item"></div>
        <div className="mainmenu_logo_container topnav_item">
          <Logo class='medium mainmenu' logo='black' />
        </div>
        <div className="mainmenu_x_container topnav_item">
          <img src="/svg/hamburger_closed.svg" alt="Hamburger Menu Closed Icon" className='pointer' onClick={closeMenuTimer} />
        </div>
      </div>
      <div className="mainmenu_flex">          
        <div className="mainmenu_container">
          <p className="menu_item_text active pointer" onClick={openMapView}>our blueprint</p>
          <p className="menu_item_text inactive link_inactive" ref={linkInactive} onClick={() => negativeFeedbackShake(linkInactive)}>our vision</p>
          <p className="menu_item_text inactive link_inactive" ref={linkInactive2} onClick={() => negativeFeedbackShake(linkInactive2)}>shop silver fern farms</p>
        </div>
        <div className="langpick_container">
          <p className="langpick_text active" ref={linkInactive3} onClick={() => negativeFeedbackShake(linkInactive3)}>english<span className='dropdown_icon'>&#x25BE;</span></p>
          <p className="langpick_text inactive link_inactive" ref={linkInactive4} onClick={() => negativeFeedbackShake(linkInactive4)}>te reo māori</p>
          <p className="langpick_text inactive link_inactive chinese_lang" ref={linkInactive5} onClick={() => negativeFeedbackShake(linkInactive5)}>中文</p>
        </div>
      </div>
    </animated.div>
  )
}
