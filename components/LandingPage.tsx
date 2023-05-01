import React, {useState, useRef} from 'react'
import CTA_Button from './UI/CTA_Button'
import Logo from './UI/Logo'
import VideoSequence from "@/components/VideoSequence";
import useStore from '@/hooks/useStore';
import { playSound } from '@/hooks/utils/audio';
import { negativeFeedbackShake } from '@/hooks/utils/utils';
import { useSpring, animated, config } from 'react-spring';

export default function LandingPage() {
  
  const [countryPicker, setCountryPicker] = useState(true)
  
  const landingPage = useStore((state: any) => state.landingPage);
  const setLandingPage = useStore((state: any) => state.setLandingPage);
  const videoSequence = useStore((state: any) => state.videoSequence);
  const setVideoSequence = useStore((state: any) => state.setVideoSequence);

  function startVideo() {
    setVideoSequence(true);
    setLandingPage(false);
  }

  const linkInactive = useRef<HTMLParagraphElement>(null)
  const linkInactive2 = useRef<HTMLParagraphElement>(null)

  const backBtnFade = useSpring({
    config: { ...config.slow },
    from: { opacity: 0 },
    to: { 
      opacity: !countryPicker ? 1 : 0
    }
  });

  const pageFade = useSpring({
    config: { ...config.molasses },
    delay: 2000,
    from: { opacity: 1 },
    to: { 
      opacity: 0
    }
  });

  return (
    <>
      {landingPage && (
        <>
          <animated.div className="black_fade" style={pageFade}></animated.div>
          <div className="landpage_outer">
            <div className="landing_inner">
              <div className='landingpage_wrapper'>
                <div className="logo_container">
                  <Logo class="large" logo="white"/>
                </div>
                <div className="picker_outerwrapper">
                  <animated.div className="back_btn_outerwrapper" style={backBtnFade}>
                    <div onClick={() => {setCountryPicker(true), playSound('ui_click')}} className="arrow_btn_container back_btn_container">
                        <div className="back_btn">
                          <img src="/svg/back_arrow.svg"  alt="Arrow icon for back button"  />
                        </div>
                        <p className='arrow_btn_text'>BACK</p>
                    </div>
                  </animated.div>
                  <div className="picker_container">
                    {
                      countryPicker ? 
                      <p className="picker_text" ref={linkInactive}>
                        I am visiting from <span className='picker link_inactive' onClick={() => negativeFeedbackShake(linkInactive)}>United States &#x25BE;</span>
                      </p>
                    :
                      <p className="picker_text" ref={linkInactive2} >
                        My preferred language is <span className='picker link_inactive' onClick={() => negativeFeedbackShake(linkInactive2)}>English &#x25BE;</span>
                      </p>
                    }
                  </div>
                  <div className="dummy"></div>
                </div>

                <div className="cta_btn_container">
                  {
                    countryPicker ? 
                    <a onClick={() => setCountryPicker(false)} className='pointer'>
                      <CTA_Button text="continue" />
                    </a>
                  :
                    <a onClick={startVideo} className='pointer'>
                      <CTA_Button text="let's go" />
                    </a>
                  }
                </div>

                <div className="sound_notice_container">
                  <p className="sound_notice_text">BEST EXPERIENCED WITH SOUND</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {videoSequence && (
        <VideoSequence />
      )}
    </>
  )
}
