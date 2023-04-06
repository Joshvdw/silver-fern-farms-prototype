import React, {useState, useRef} from 'react'
import CTA_Button from './UI/CTA_Button'
import Logo from './UI/Logo'
import VideoSequence from "@/components/VideoSequence";
import useStore from '@/hooks/useStore';
import { playSound } from '@/hooks/utils/audio';
// import useImagePreloader from '@/hooks/utils/images';

// import BackArrow from '../public/svg/back_arrow.svg'
// // import ForwardArrow from 'svg/image2.jpg'
// // import Image3 from 'svg/image3.svg'

// const preloadSrcList: string[] = [
//   BackArrow
//   // Image2,
//   // Image3,
// ]

export default function LandingPage() {
  // const { imagesPreloaded } = useImagePreloader(preloadSrcList)
  
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
     {/* {(!imagesPreloaded) && ( */}
        <>
          {landingPage && (
          <div className='landingpage_wrapper'>
            <div className="logo_container">
              <Logo class="large" logo="white"/>
            </div>
            <div className="picker_outerwrapper">
              <div className="back_btn_outerwrapper" style={countryPicker ? {opacity: '0'} : {opacity: '1'}}>
                <div onClick={() => {setCountryPicker(true), playSound('ui_click')}} className="arrow_btn_container back_btn_container">
                    <div className="back_btn">
                      <img src="/svg/back_arrow.svg"  alt="Arrow icon for back button"  />
                    </div>
                    <p className='arrow_btn_text'>BACK</p>
                </div>
              </div>
              <div className="picker_container">
                {
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
        )}
        {videoSequence && (
          <VideoSequence />
        )}
      </>
      {/* )} */}
    </>
  )
}
