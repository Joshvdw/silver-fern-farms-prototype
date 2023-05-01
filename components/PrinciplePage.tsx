import React, { useRef, useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring';
import { exitFullscreen, goFullScreen, handleFullscreenChange, idleTimer, isSafariOnDesktop, useIntersectionObserver } from '@/hooks/utils/utils';
import PrincipleLottie from './PrincipleLottie'
import Panoramic from './Panoramic';
import { playSound, toggleBackgroundSound } from '@/hooks/utils/audio';
import useStore from '@/hooks/useStore';
import { mobileSizeState } from '@/hooks/utils/mobile';

export default function PrinciplePage(prop: {page: string}) {
  
  const [scrolled, setScrolled] = useState(false)
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  const [isIdle, setIsIdle] = useState(false)

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [panoramicState, setPanoramicState] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const panoramicLoad = useStore((state: any) => state.panoramicLoad)
  
  const triggerRef_h1 = useRef<HTMLHeadingElement>(null);
  const dataRef_h1 = useIntersectionObserver(triggerRef_h1, {freezeOnceVisible: true});

  const triggerRef_h6 = useRef<HTMLHeadingElement>(null);
  const dataRef_h6 = useIntersectionObserver(triggerRef_h6, {freezeOnceVisible: true});

  const triggerRef_subheader = useRef<HTMLParagraphElement>(null);
  const dataRef_subheader = useIntersectionObserver(triggerRef_subheader, {freezeOnceVisible: true});

  const triggerRef_video = useRef<HTMLDivElement>(null)  
  const dataRef_video = useIntersectionObserver(triggerRef_video, {freezeOnceVisible: true});  

  const triggerRef_paragraph = useRef<HTMLParagraphElement>(null);
  const dataRef_paragraph = useIntersectionObserver(triggerRef_paragraph, {freezeOnceVisible: true});

  const wrapperRef = useRef<HTMLDivElement>(null);
  const fullscreen_overlay = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  idleTimer(triggerRef_video, setIsIdle)
  mobileSizeState(isMobile, setIsMobile, setIsLoading)

  useEffect(() => {    
    setPanoramicState(panoramicLoad)
  }, [panoramicLoad])

  useEffect(() => {
    function handleScroll() {
      setScrolled(true)
      const scrollTop = window.pageYOffset;

      if (scrollTop === 0) {
        setIsScrolledToTop(true);
      } else {
        setIsScrolledToTop(false);
      }
    }    

    if (isScrolledToTop == true) {      
      toggleBackgroundSound('unmute')
    } else {
      toggleBackgroundSound('mute')
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };  
  }, [scrolled,isScrolledToTop])

  

  const fade_delay = 500

  const fade_h1 = useSpring({
    config: { ...config.molasses },
    delay: fade_delay,
    from: { opacity: 0 },
    to: { 
      // @ts-ignore
      opacity: dataRef_h1?.isIntersecting ? 1 : 0,
    }
  });

  const fade_h6 = useSpring({
    config: { ...config.molasses },
    delay: fade_delay,
    from: { opacity: 0 },
    to: { 
      // @ts-ignore
      opacity: dataRef_h6?.isIntersecting ? 1 : 0,
    }
  });

  const fade_subheader = useSpring({
    config: { ...config.molasses },
    delay: fade_delay,
    from: { opacity: 0 },
    to: { 
      // @ts-ignore
      opacity: dataRef_subheader?.isIntersecting ? 1 : 0,
    }
  });

  const fade_video = useSpring({
    config: { ...config.molasses },
    delay: fade_delay,
    from: { opacity: 0 },
    to: { 
      // @ts-ignore
      opacity: dataRef_video?.isIntersecting ? 1 : 0,
    }
  });

  const fade_paragraph = useSpring({
    config: { ...config.molasses },
    delay: fade_delay - 350,
    from: { opacity: 0 },
    to: { 
      // @ts-ignore
      opacity: dataRef_paragraph?.isIntersecting ? 1 : 0,
    }
  });

  
  // hero transition 
  const slide_delay = 1250
  const hero_delay = 3500

  const pageSlide = useSpring({ 
    config: { ...config.slow },
    from: { marginTop: "100vh" },
    to: { marginTop: "0vh" }
  });

  const num1 = useSpring({ 
    delay: slide_delay + 1500,
    config: { ...config.slow },
    val: 44.8575,
    from: { val: panoramicState ? 23.2451 : 44.8575} 
  });

  const num2 = useSpring({ 
    delay: slide_delay + 1700,
    config: { ...config.slow },
    val: 169.3859, 
    from: { val: panoramicState ? 129.2546 : 169.3859} 
  });  

  const fade1 = useSpring({
    delay: slide_delay + 100,
    config: { ...config.molasses },
    from: { opacity: 0 },
    to: { opacity: panoramicState ? 1 : 0 }
  });

  const fade2 = useSpring({
    delay: slide_delay + 750,
    config: { ...config.molasses },
    from: { opacity: 0 },
    to: { opacity: panoramicState ? 1 : 0 }
  });

  const fade3 = useSpring({
    delay: slide_delay + 1500,
    config: { ...config.molasses },
    from: { opacity: 0 },
    to: { opacity: panoramicState ? 1 : 0 }
  });

  const blackOverlay = useSpring({
    delay: slide_delay + hero_delay + 200,
    config: { ...config.molasses },
    from: { background: 'rgba(0, 0, 0, 0.25)' },
    to: { background: panoramicState ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.25)' }
  });  

  const fadeOut = useSpring({
    delay: slide_delay + hero_delay,
    config: { ...config.gentle },
    from: { opacity: 1 },
    to: { opacity: panoramicState ? 0 : 1 }
  });  

  const scrollDown = useSpring({
    delay: slide_delay + hero_delay,
    config: { ...config.molasses },
    from: { top: '85vh' },
    to: { top: panoramicState ? '90vh' : '85vh' }
  });  

  const heroMove = useSpring({
    delay: slide_delay + hero_delay + 200,
    config: { ...config.molasses },
    from: { top: '40vh' },
    to: { top: panoramicState ? '0' : '40vh' }
  });  

  const shrinkHero = useSpring({
    delay: slide_delay + hero_delay + 200,
    config: { ...config.slow },
    from: { scale: 1 },
    to: { scale: panoramicState ? .33 : 1 }
  });    

  const fadeOutScroll = useSpring({
    config: { ...config.slow },
    from: { opacity: 1},
    to: { opacity: scrolled ? 0 : 1 }
  });  

  const fadeCloseBtn = useSpring({
    config: { ...config.gentle },
    from: { opacity: 1},
    to: { opacity: isIdle ? 0 : 1 }
  });  

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => handleFullscreenChange(setIsFullscreen, videoRef.current));
    return () => {
      document.removeEventListener('fullscreenchange', () => handleFullscreenChange(setIsFullscreen, videoRef.current));
    };
  }, []);

  function mobileSrc() {
    if ((isMobile) && (!isFullscreen)) {
      if(videoRef.current) videoRef.current.src = "/videos/principle_video_mobile.mp4";
    }
  }

  function desktopSrc() {    
    if(videoRef.current) videoRef.current.src = "/videos/principle_video_desktop.mp4";
  }

  return (
    <animated.div id="top" style={pageSlide} className='principle_wrapper' ref={wrapperRef} onScroll={() => setScrolled(true)}>
      <animated.div className="principle_hero_container" >
        <animated.div className="hero_text_container" style={{...heroMove, ...shrinkHero}}>
          <animated.h5 style={panoramicState ? fade1 : {opacity: "0"}}>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>{panoramicState ? num1.val.to(val => val.toFixed(4)) : ''}</animated.span>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>°  S  | </animated.span>  
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>{panoramicState ? num2.val.to(val => val.toFixed(4)): ''}</animated.span>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>°  E</animated.span>
          </animated.h5>
          <animated.h2 style={panoramicState ? fade2 : {opacity: "0"}}>LINDIS CROSSING</animated.h2>
          <animated.h5 style={panoramicState ? fade3 : {opacity: "0"}}>CENTRAL OTAGO | NEW ZEALAND</animated.h5>
        </animated.div>
        <animated.a href="#principle_page" className="scrolldown_indicator_container" style={{...scrollDown, ...fadeOutScroll}} onClick={() => playSound('ui_click')}>
          <animated.p className="footer_header scrolldown_header" style={panoramicState ? fade3 : {opacity: "0"}}>SCROLL</animated.p>
          <animated.img src="/svg/scrolldown_line.svg" alt="Scrolldown Indicator Button"  style={fade3} />
        </animated.a>
      </animated.div>
      
      {isSafariOnDesktop() && (
          <div className="fallback_video_container">
            <video className="fallback_video" autoPlay loop>
              <source src="/videos/360_video.mp4" type="video/mp4"/>
            </video> 
          </div>
        ) 
      }
      <Panoramic />    
      <animated.div style={blackOverlay} className="black_hero_overlay"></animated.div>
      <div className="top_gradient"></div>
      <div className="bottom_gradient"></div>
      <div className="principle_content_container" id='principle_page'>
        <animated.h6 ref={triggerRef_h6} style={fade_h6}>PRINCIPLE No. 1</animated.h6>
        <animated.h1 ref={triggerRef_h1} style={fade_h1} className="principle_header">REDUCING OUR CARBON FOOTPRINT</animated.h1>
        <animated.p 
          className="principle_subheader" 
          ref={triggerRef_subheader} 
          style={fade_subheader}
        >
          Meet the Smith Family, planting natives to inset their emissions on-farm.
        </animated.p>

        <animated.div style={fade_video} ref={triggerRef_video} onClick={() => {goFullScreen(triggerRef_video.current); mobileSrc();}}>
            <div className="fullscreen_overlay" ref={fullscreen_overlay} style={{display: isFullscreen ? "block" : "none",}}>
              <div className="close_btn_wrapper pointer" onClick={() => {exitFullscreen(); desktopSrc();}}>
                  <animated.div style={isMobile ? {} : {...fadeCloseBtn}} className="arrow_btn_container principle_btn">
                    <p className='arrow_btn_text'>CLOSE</p>
                    <div className="back_btn close_btn">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="2"/>
                        <rect width="20.4775" height="2.04774" transform="matrix(0.703884 -0.710314 0.703884 0.710314 10.1445 24.5454)" fill="white"/>
                        <rect width="20.4775" height="2.04774" transform="matrix(-0.703884 -0.710314 0.703884 -0.710314 24.4141 26)" fill="white"/>
                      </svg>
                    </div>
                  </animated.div>
              </div>
            </div>
          {isLoading ? (
              <></>
            ) 
          : 
            (
              <video 
                webkit-playsinline="true"
                playsInline
                className='principle_video pointer' 
                autoPlay 
                disablePictureInPicture
                controlsList="nodownload noplaybackrate"
                loop 
                ref={videoRef}
              >
                <source src="/videos/principle_video_desktop.mp4" type="video/mp4" />
              </video> 
            )}
        </animated.div>
        <animated.p className='principle_paragraph' ref={triggerRef_paragraph} style={fade_paragraph}>
          The Smiths are a proud, third-generation farm family from Otago. 
          Deeply connected to the land and conscious of the threat of climate change, 
          they are committed to working in a sustainable way for future generations. 
          Join their journey to counter the emissions of their farm by planting native trees — 
          striving to make a regenerative impact on the world, starting in their very own backyard.
        </animated.p>
      </div>
      <PrincipleLottie reference={wrapperRef}/>
    </animated.div>
  )
}
