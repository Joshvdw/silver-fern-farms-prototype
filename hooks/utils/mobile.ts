import { useRef, useEffect, useState } from "react";

interface SwipeProps {
  ref: React.RefObject<HTMLDivElement>;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

const useSwipe = ({ ref, onSwipeUp, onSwipeDown }: SwipeProps) => {
  const startY = useRef<number>(0);
  const endY = useRef<number>(0);

  useEffect(() => {
    const div = ref.current;

    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      endY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (startY.current < endY.current && onSwipeDown) {
        onSwipeDown();
      } else if (startY.current > endY.current && onSwipeUp) {
        onSwipeUp();
      }
    };

    if (div) {
      div.addEventListener("touchstart", handleTouchStart);
      div.addEventListener("touchmove", handleTouchMove);
      div.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (div) {
        div.removeEventListener("touchstart", handleTouchStart);
        div.removeEventListener("touchmove", handleTouchMove);
        div.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [ref, onSwipeUp, onSwipeDown]);
};


// WHETHER VIEWPORT WIDTH IS OF MOBILE DIMENSIONS 
function mobileSizeState (isMobile: any, setIsMobile: any, setIsLoading: any) {
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) {
        setIsMobile(true);
      } else if (viewportWidth > 768) {
        setIsMobile(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    setIsLoading(false);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
}


// WHETHER VIEWPORT WIDTH IS OF MOBILE DIMENSIONS 
function getScreenSize () {

  const [viewport, setViewport] = useState({ width: window.innerWidth });

  useEffect(() => {
    function handleResize() {
      setViewport({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1280;
  const isDesktop = viewport.width >= 1280;

  return { viewport, isMobile, isTablet, isDesktop };
}

export {
  useSwipe,
  mobileSizeState,
  getScreenSize
} 