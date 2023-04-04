import React, {useState} from 'react'
import CTA_Button from './UI/CTA_Button'
import Arrow_Button from './UI/Arrow_Button';
import Logo from './UI/Logo'
import VideoSequence from "@/components/VideoSequence";
import useStore from '@/hooks/useStore';
import { playSound } from '@/utils/audio';

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

  return (
    <>
      {landingPage && (
        <div className='landingpage_wrapper'>
          <div className="logo_container">
            <Logo class="large" logo="white"/>
          </div>
          
          <div className="picker_outerwrapper">
            { // conditionally render back-btn
              countryPicker ?
              <div className="dummy">
              </div>
            :
              <div className="back_btn_outerwrapper">
                <div onClick={() => {setCountryPicker(true), playSound('ui_click')}} className="arrow_btn_container back_btn_container">
                    {/* <Arrow_Button forward={false} state={false}/> */}
                    <div className="back_btn">
                      <img src="/images/back_arrow.png"  alt="Arrow icon for back button"  />
                    </div>
                    <p className='arrow_btn_text'>BACK</p>
                </div>
              </div>
            }
            <div className="picker_container">
              { // conditionaly render country or lang picker
                countryPicker ? 
                <p className="picker_text">
                  I am visiting from <span className='picker link_inactive'>United States &#x25BE;</span>
                </p>
              :
                <p className="picker_text">
                  My preferred language is <span className='picker link_inactive'>English &#x25BE;</span>
                </p>
              }
            </div>
            <div className="dummy"></div>
          </div>

          <div className="cta_btn_container">
            { // conditionaly render cta-btns
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
      )}
      {videoSequence && (
        <VideoSequence />
      )}
    </>
  )
}
