import React from 'react'
import useStore from '@/hooks/useStore'
import CTA_Button from './UI/CTA_Button'
import Logo from './UI/Logo'
import { playSound } from '@/hooks/utils/audio'
import { useSpring, animated, config } from 'react-spring';

export default function WelcomeScreen() {
  const setWelcomeScreen = useStore((state: any) => state.setWelcomeScreen)

  const fadeIn = useSpring({
    config: { ...config.slow },
    from: { opacity: 0},
    to: { opacity: 1 }
  });  

  function handleClick() {
    setWelcomeScreen()
    playSound('bg_ambience')
  }

  return (
    <animated.div className='welcomeScreen_wrapper' style={fadeIn}>
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
      <div onClick={handleClick} className="explore_btn_container pointer">
        <CTA_Button text='explore' />
      </div>
    </animated.div>
  )
}
