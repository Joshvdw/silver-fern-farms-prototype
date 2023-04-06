import React, {useRef, useState, useEffect} from 'react'
import useStore from '@/hooks/useStore'
import { playSound } from '@/hooks/utils/audio';

export default function VideoSequence() {
  
  const [isPlaying, setIsPlaying] = useState(true)

  const setVideoSequence = useStore((state: any) => state.setVideoSequence);

  const video = useRef<HTMLVideoElement>(null)

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
  }
  
  return (
    <>
      {isPlaying && (
      <div className='videosequence_wrapper'>
        <video className='video_sequence' autoPlay controls ref={video}>
          <source src='/videos/intro_sequence.mp4' type="video/mp4"/>
        </video>

        <div onClick={() => {endVideo(), playSound('ui_click')}} className="arrow_btn_container videoskip_container">
          <p className='arrow_btn_text'>SKIP</p>
          <div className="back_btn">
            <img src="/svg/forward_arrow.svg"  alt="Arrow icon for forward button"  />
          </div>
        </div>
      </div>
      )}
    </>
  )
}
