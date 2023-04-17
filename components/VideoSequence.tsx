import React, {useRef, useState, useEffect, useCallback} from 'react'
import useStore from '@/hooks/useStore'
import { playSound } from '@/hooks/utils/audio';
import { useSpring, animated, config } from 'react-spring';
import { idleTimer, mobileSizeState } from '@/hooks/utils/utils';
import { useRouter } from 'next/router';

export default function VideoSequence() {
  
  const video = useRef<HTMLVideoElement>(null)
  const setVideoSequence = useStore((state: any) => state.setVideoSequence);

  const [isPlaying, setIsPlaying] = useState(true)
  const [isIdle, setIsIdle] = useState(false)

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter()

  idleTimer(video, setIsIdle)

  mobileSizeState(isMobile, setIsMobile, setIsLoading)
  
  useEffect(() => {
    if (video.current)     
      video.current.onended = () => {
        endVideo();
      };
  }, [])

  function endVideo() {
    setIsPlaying(false);
    setVideoSequence(false);  
    playSound('bg_ambience');  
    window.sessionStorage.setItem('siteState', "true"); 
    router.push('/map')  
  }

  const fadeOut = useSpring({
    config: { ...config.gentle },
    from: { opacity: 1},
    to: { opacity: isIdle ? 0 : 1 }
  });  

    
  
  return (
    <>
      {isPlaying && (
      <div className='videosequence_wrapper'>
        <video 
          ref={video}
          className='video_sequence' 
          autoPlay 
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          controls
          // make video play inline, instead of fullscreen by default on mobile
          webkit-playsinline="true"
          playsInline
        >
          <source src='/videos/intro_sequence.mp4' type="video/mp4"/>
        </video>

        <animated.div style={isMobile ? {} : {...fadeOut}} onClick={() => {endVideo(), playSound('ui_click')}} className="arrow_btn_container videoskip_container">
          <p className='arrow_btn_text'>SKIP</p>
          <div className="back_btn">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="17" stroke="white" stroke-width="2"/>
              <mask id="mask0_885_1273" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="10" y="8" width="20" height="20">
                <rect x="10" y="8" width="20" height="20" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_885_1273)">
                <path d="M16 26L14.583 24.583L21.167 18L14.583 11.417L16 10L24 18L16 26Z" fill="white"/>
              </g>
            </svg>
          </div>
        </animated.div>
      </div>
      )}
    </>
  )
}
