import useStore from '@/hooks/useStore'
import { playSound } from '@/utils/audio'
import React from 'react'
import Logo from './UI/Logo'

export default function MainMenu() {

  const spotLight = useStore((state: any) => state.spotLight);
  const setSpotLight = useStore((state: any) => state.setSpotLight)
  const setHamburgerMenu = useStore((state: any) => state.setHamburgerMenu)
  const setBackToMap = useStore((state: any) => state.setBackToMap)  
  const setPrinciple = useStore((state: any) => state.setPrinciple)
  const setOpenPrinciple = useStore((state: any) => state.setOpenPrinciple)
  const setBottomNav = useStore((state: any) => state.setBottomNav)

  function openMapView() {
    setHamburgerMenu();
    setSpotLight(false);
    setOpenPrinciple(false);
    setBackToMap(true);
    setPrinciple(0);
    setBottomNav(false);
    playSound('ui_click')
    // if (spotLight == true) {
    //   playSound('reverse')
    // }
  }
  
  return (
    <div className="mainmenu_wrapper">
      <div className="mainmenu_topnav">
        <div className="dummy topnav_item"></div>
        <div className="mainmenu_logo_container topnav_item">
          <Logo class='medium mainmenu' logo='black' />
        </div>
        <div className="mainmenu_x_container topnav_item">
          <img src="/images/hamburger_closed.png" alt="Hamburger Menu Icon" className='pointer' 
            onClick={() => {setHamburgerMenu(), playSound('ui_click')}}
          />
        </div>
      </div>
      <div className="mainmenu_flex">          
        <div className="mainmenu_container">
          <p className="menu_item_text active pointer" onClick={openMapView}>our blueprint</p>
          <p className="menu_item_text inactive link_inactive">our vision</p>
          <p className="menu_item_text inactive link_inactive">shop silver fern farms</p>
        </div>
        <div className="langpick_container">
          <p className="langpick_text active">english<span className='dropdown_icon'>&#x25BE;</span></p>
          <p className="langpick_text inactive link_inactive">te reo māori</p>
          <p className="langpick_text inactive link_inactive">中文</p>
        </div>
      </div>
    </div>
  )
}
