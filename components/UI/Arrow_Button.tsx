import React, { useState } from 'react'
import Image from 'next/image'
import { useSpring, animated, config } from 'react-spring';

export default function Arrow_Button(prop: {forward: boolean, state: boolean}) {

 const btnHover = useSpring({
    config: { ...config.slow },
    from: { 
      background: "rgba(0, 0, 0, 0)",
    },
    to: {
      background: prop.state ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
    }
  });

  return (
    <animated.div 
      className='back_btn' 
      // style={btnHover}
      >
      <Image
        src="/images/back_arrow.png" 
        alt="Arrow icon for back button" 
        style={prop.forward ? {transform: 'scaleX(-1)'} : {}}
        width={36}
        height={36}
        priority
        loading='eager'
      />
    </animated.div>
  )
}
