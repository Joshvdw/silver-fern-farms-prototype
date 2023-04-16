import React from 'react'
import useStore from '@/hooks/useStore'
import CTA_Button from './UI/CTA_Button'
import Logo from './UI/Logo'
import { playSound } from '@/hooks/utils/audio'

export default function WelcomeScreen() {
  
  const setWelcomeScreen = useStore((state: any) => state.setWelcomeScreen)

  return (
    <div className='welcomeScreen_wrapper'>
      <div className="logo_container">
        <Logo class="medium" logo="white"/>
      </div>
      <div className="welcome_text_wrapper">
        <div className="welcome_header_container">
          <p className='subheader welcome_subheader'>Discover our blueprint for the farms of the future</p>
        </div>
        <div className="welcome_p_container">
          <p>Explore our farm to learn more about the Silver Fern Farms 
            regenerative principles and the real farms all over New Zealand 
            putting them to work.</p>
        </div>
      </div>
      <div onClick={() => {setWelcomeScreen(), playSound('bg_ambience')}} className="explore_btn_container pointer">
        <CTA_Button text='explore' />
      </div>
    </div>
  )
}
