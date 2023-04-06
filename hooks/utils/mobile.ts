import { useRef, useEffect } from "react";

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
export {
  useSwipe
} 