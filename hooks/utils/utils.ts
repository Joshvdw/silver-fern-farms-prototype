import { useEffect, useState } from "react"
  
  function principleCounter (direction: string, principle: any) {
    if (direction == "next") {
      // replace hard coded num with array.length when I have data
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

  export {
    principleCounter,
    calcPrevNum,
    getTopPosition,
    normalise,
    useIntersectionObserver
  }