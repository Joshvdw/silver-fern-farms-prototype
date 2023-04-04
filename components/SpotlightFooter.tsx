import useStore from '@/hooks/useStore';
import { playSound } from '@/utils/audio';
import React from 'react'

export default function SpotlightFooter() {

  const setOpenPrinciple = useStore((state: any) => state.setOpenPrinciple)

  function handleClick () {
    setOpenPrinciple(true);
    playSound('ui_click');
  }
 
  return (
    <div className="spotlight_footer_wrapper pointer" >
      <div className="footer_container" onClick={handleClick}>
        <div className="footer_text_container">
          <p className="footer_header">SLIDE TO VISIT</p>
          <p className="footer_text">LINDIS CROSSING STATION</p>
        </div>
        <div className="footer_btn_container">
          <img src="/images/spotlight_footer_btn.png" alt="Spotlight Button" />
        </div>
      </div>
    </div>
  )
}
