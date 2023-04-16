import { useEffect, useState, useRef } from "react"
  

  // PRINCIPLE NUMBER COUNTER
  function principleCounter (direction: string, principle: any) {
    if (direction == "next") {
      // replace hard coded num with array.length when all principle pages are present
      if (principle == 7) {
        return 1
      } else {
        return principle + 1
      }
    }
    if (direction == "prev") {
      if ((principle == 1) || (principle == 0)) {
        return 7
      } else {
        return principle - 1
      }
    }
  }


  // CALCULATE PREVIOUS PRINCIPLE NUMBER
  function calcPrevNum(direction: string, principle: any, prevNum: any) {
    if (direction == "prev") {
      if (prevNum == 1) {
        return 7
      } 
      if (prevNum == 7) {
        return 6
      } 
      return principle - 2
    } else {
      if (principle == 0) {
        return 7
      }
      return principle
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
      }
  
      return () => {
        // Cleanup the event listeners and the timer when the component unmounts
        clearTimeout(idleTimer.current!);
        if (video.current) {
          video.current.removeEventListener("mousemove", handleMouseMove);
          video.current.removeEventListener("keydown", handleKeyDown);
        }
      };
    }, [setIsIdle]);
  }


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

  export {
    principleCounter,
    calcPrevNum,
    getTopPosition,
    normalise,
    useIntersectionObserver,
    negativeFeedbackShake,
    idleTimer,
    mobileSizeState
  }