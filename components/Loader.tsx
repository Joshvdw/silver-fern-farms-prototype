import React, { useRef } from "react";
import { useSpring, config, animated, easings } from "react-spring";

export default function Loader (props: {loadingProgress: number}) {  
  const loadingLogo = useRef<HTMLDivElement>(null)  

  const fadeLoop = useSpring({
    config: { 
      tension: 10,
      friction: 5,
      duration: 1000
     },
    from: { opacity: .5 },
    to: [{opacity: 1}, {opacity: .5}],
    loop: true
  });

    const progressBar = useSpring({
    config: {...config.molasses},
    from: { width: "0%" },
    to: {width: `${props.loadingProgress}%`}
  });

  
  return (
    <div className="loader_wrapper">
      <div className="load_bar">
        <animated.div className="progress_bar" style={progressBar}></animated.div>
      </div>
      <animated.div className="load_icon" ref={loadingLogo} style={fadeLoop}>
        <img src="/svg/fern_logo_white.svg" alt="White Fern Logo" />
      </animated.div>
    </div>
  )
}