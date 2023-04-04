import React, { useRef, useEffect, RefObject, MutableRefObject } from 'react'
import lottie, { AnimationItem } from "lottie-web";
import lottieData from "@/public/lotties/principle_lottie.json";
import { getTopPosition, normalise } from '@/utils/utils';
interface PrincipleLottieProps {
  reference: RefObject<HTMLDivElement> | null
}

export default function PrincipleLottie(prop: PrincipleLottieProps) {
  
  const lottie_container = useRef<HTMLDivElement>(null);
  const lottie_wrapper = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);
  
  useEffect(() => {
    if (lottie_container.current) { 
      anim.current = lottie.loadAnimation({
        container: lottie_container.current!,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: lottieData
      });

    const animation = anim.current!

    const onScroll = () => {      
      if (prop.reference) {
        const wrapperRef = prop.reference.current

        if (wrapperRef) {
          const totalHeight = wrapperRef.offsetHeight - window.screen.height
          // if you want lottie to start once it's entirely in viewport, remove last part of the equation below
          const element_offset = getTopPosition(lottie_wrapper.current).y - (window.screen.height / 2)
          const range = normalise(window.scrollY, totalHeight, element_offset)
          const frame = animation.totalFrames * range;
    
          if (frame <= animation.totalFrames - 1) {
            animation.goToAndStop(frame, true);   
          }
        }
      }
    };

    document.addEventListener("scroll", onScroll);
    
    return () => {
      animation.destroy();
      document.removeEventListener("scroll", onScroll);
    };  
  }
}, [])

  return (
    <div className="principle_lottie_wrapper" ref={lottie_wrapper}>
      <div className="lottie_container">
        <div className="principle_lottie" ref={lottie_container}></div>
      </div>
    </div>
  )
}
