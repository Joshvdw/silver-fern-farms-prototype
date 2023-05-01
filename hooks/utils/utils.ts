import { useEffect, useState, useRef } from "react"
import principleData from "@/data/principleData"

const arrayLength = principleData.length - 1;

// GETTING PREV NUM
function getPrevNum(principle: number) {
  let prevNum = principle
  if (prevNum == 0) {
    return arrayLength
  } else {
    return prevNum - 1
    }    
}

// GETTING NEXT NUM 
function getNextNum(principle: number) {
  let nextNum = principle
  if (nextNum == arrayLength) {
    return 0
  } else {
    return nextNum + 1
  }
}

// GET ELEMENT POSITION FROM TOP OF VIEWPORT 
function getTopPosition(element:any) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
}


// NORMALISE VALUE
function normalise(val: number, max: number, min: number) {
  const normal = (val - min) / (max - min);

  if (normal < 0) {
    return 0;
  } else if (normal > 1) {
    return 1;
  } else {
    return normal;
  }
}


// RETURNS IF HTML ELEMENT IS SCROLLED IN VIEW 
function useIntersectionObserver(
  elementRef: any,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }
) {
  const [entry, setEntry] = useState();

  // @ts-ignore
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]:any) => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

// NEGATIVE FEEDBACK SHAKE
function negativeFeedbackShake(ref: any) {
  ref.current.classList.add("shake");
    setTimeout(() => {
      ref.current.classList.remove("shake");
    }, 500);
}


// IDLE TIMER 
function idleTimer(video: any, setIsIdle: any) {
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      clearTimeout(idleTimer.current!);
      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
      }, 2500);
    };

    resetIdleTimer();

    const handleMouseMove = () => {
      resetIdleTimer();
      setIsIdle(false);
    };

    const handleKeyDown = () => {
      resetIdleTimer();
    };

    if (video.current) {
      video.current.addEventListener("mousemove", handleMouseMove);
      video.current.addEventListener("keydown", handleKeyDown);
      video.current.addEventListener("click", handleMouseMove);
    }

    return () => {
      // Cleanup the event listeners and the timer when the component unmounts
      clearTimeout(idleTimer.current!);
      if (video.current) {
        video.current.removeEventListener("mousemove", handleMouseMove);
        video.current.removeEventListener("keydown", handleKeyDown);
        video.current.addEventListener("click", handleMouseMove);
      }
    };
  }, [setIsIdle]);
}

  
// CUSTOM FULLSCREEN FUNCTIONS
function goFullScreen(element: any) {
  if (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

function handleFullscreenChange(setIsFullscreen: any, ref: any) {
  if (document.fullscreenElement) {
    setIsFullscreen(true);
    ref?.pause();
    if (ref) {
      ref.currentTime = 0;
      ref.controls = true;
    }
    ref?.play();
  } else {
    setIsFullscreen(false);
    if (ref) {
      ref.controls = false;
    }
  }
}

// CAPTURE WHETHER USER IS ON SAFARI DESKTOP
const isSafariOnDesktop = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isSafari = userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1;
  const isDesktop = window.innerWidth >= 768;
  return isSafari && isDesktop;
};

export {
  getPrevNum,
  getNextNum,
  getTopPosition,
  normalise,
  useIntersectionObserver,
  negativeFeedbackShake,
  idleTimer,
  goFullScreen,
  exitFullscreen,
  handleFullscreenChange,
  isSafariOnDesktop
}