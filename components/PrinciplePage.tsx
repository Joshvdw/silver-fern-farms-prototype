import React, { useRef, useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring';
import { useIntersectionObserver } from '@/hooks/utils/utils';
import PrincipleLottie from './PrincipleLottie'
import Panoramic from './Panoramic';
import { playSound, toggleBackgroundSound } from '@/hooks/utils/audio';
import useStore from '@/hooks/useStore';

export default function PrinciplePage(prop: {page: string}) {
  
  const [scrolled, setScrolled] = useState(false)
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [panoramicState, setPanoramicState] = useState(false);

  const panoramicLoad = useStore((state: any) => state.panoramicLoad)

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


  const fade_delay = 500
  // const fade_delay = 0

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

  useEffect(() => {
    console.log(panoramicLoad);
    
    setPanoramicState(panoramicLoad)
  }, [panoramicLoad])
  
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

  let viewportWidth = window.innerWidth;
  
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) {
        setIsMobile(true);
      } else if (viewportWidth > 768) {
        setIsMobile(false);
      }
    };
    
    handleResize(); // Call the function once to set the initial state.
    
    window.addEventListener('resize', handleResize);
    setIsLoading(false); // Set isLoading to false once the state has been updated.

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  console.log(panoramicState)
  return (
    <animated.div style={pageSlide} className='principle_wrapper' ref={wrapperRef} onScroll={() => setScrolled(true)}>
      <animated.div className="principle_hero_container" >
        <animated.div className="hero_text_container" style={{...heroMove, ...shrinkHero}}>
          <animated.h5 style={panoramicState ? fade1 : {opacity: "0"}}>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>{panoramicState ? num1.val.to(val => val.toFixed(4)) : ''}</animated.span>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>°  S  | </animated.span>  
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>{panoramicState ? num2.val.to(val => val.toFixed(4)): ''}</animated.span>
            <animated.span style={panoramicState ? fadeOut : {opacity: "1"}}>°  E</animated.span>
          </animated.h5>
          <animated.h2 style={panoramicState ? fade2 : {opacity: "0"}}>P{prop.page} LINDIS CROSSING</animated.h2>
          <animated.h5 style={panoramicState ? fade3 : {opacity: "0"}}>CENTRAL OTAGO | NEW ZEALAND</animated.h5>
        </animated.div>
        <animated.a href="#scrolldown_link" className="scrolldown_indicator_container" style={{...scrollDown, ...fadeOutScroll}} onClick={() => playSound('ui_click')}>
          <animated.p className="footer_header scrolldown_header" style={panoramicState ? fade3 : {opacity: "0"}}>SCROLL</animated.p>
          <animated.img src="/svg/scrolldown_line.svg" alt="Scrolldown Indicator Button"  style={fade3} />
        </animated.a>
      </animated.div>
      <Panoramic />
      <animated.div style={blackOverlay} className="black_hero_overlay"></animated.div>
      <div className="principle_content_container" id='scrolldown_link'>
        <animated.h6 ref={triggerRef_h6} style={fade_h6}>PRINCIPLE No. {prop.page}</animated.h6>
        <animated.h1 ref={triggerRef_h1} style={fade_h1} className="principle_header">REDUCING OUR CARBON FOOTPRINT</animated.h1>
        <animated.p className="principle_subheader" ref={triggerRef_subheader} style={fade_subheader}>lorem ipsum dolor sit amet, consectetur adipiscing elit sit dolor amet.</animated.p>
          <animated.div style={fade_video} ref={triggerRef_video}>
            {isLoading ? (
                <></>
              ) 
            : 
              (
                <video 
                  className='principle_video' 
                  autoPlay 
                  controls loop 
                >
                  <source src={`/videos/${isMobile ? 'intro_sequence' : 'principle_video'}.mp4`} type="video/mp4"/>
                </video> 
            )}
          </animated.div>
        <animated.p className='principle_paragraph' ref={triggerRef_paragraph} style={fade_paragraph}>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</animated.p>
      </div>
      <PrincipleLottie reference={wrapperRef}/>
    </animated.div>
  )
}
