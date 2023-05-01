import React, {
  useRef,
  useEffect,
  useState,
  RefObject,
  MutableRefObject,
} from "react";
import lottie, { AnimationItem } from "lottie-web";
import { getTopPosition, normalise } from "@/hooks/utils/utils";
import { getScreenSize } from "@/hooks/utils/mobile";
interface PrincipleLottieProps {
  reference: RefObject<HTMLDivElement> | null;
}
const mobileLottie = "lotties/SFF_Mobile_Scroll_v02.json";
const tabletLottie = "lotties/SFF_Tablet_Scroll_v02.json";
const desktopLottie = "lotties/SFF_Desktop_Scroll_v02.json";

export default function PrincipleLottie(prop: PrincipleLottieProps) {
  const lottie_container = useRef<HTMLDivElement>(null);
  const lottie_wrapper = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  const { isMobile, isTablet, isDesktop } = getScreenSize();

  const [lottePath, setLottiePath] = useState<string>(desktopLottie);

  useEffect(() => {
    if (lottie_container.current) {
      anim.current = lottie.loadAnimation({
        container: lottie_container.current!,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: isMobile ? mobileLottie
                     : isTablet ? tabletLottie
                     : isDesktop ? desktopLottie
                     : desktopLottie,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });

      const animation = anim.current!;

      const onScroll = () => {
        if (prop.reference) {
          const wrapperRef = prop.reference.current;

          if (wrapperRef) {
            const totalHeight = wrapperRef.offsetHeight - window.screen.height;
            // if you want lottie to start once it's entirely in viewport, remove last part of the equation below
            const element_offset =
              getTopPosition(lottie_wrapper.current).y -
              window.screen.height / 2;
            const range = normalise(
              window.scrollY,
              totalHeight,
              element_offset
            );
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
  }, []);

  useEffect(() => {
    if (isMobile) {
      setLottiePath(mobileLottie);
    } else if (isTablet) {
      setLottiePath(tabletLottie);
    } else {
      setLottiePath(desktopLottie);
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div className="principle_lottie_wrapper" ref={lottie_wrapper}>
      <div className="lottie_container">
        <div className="principle_lottie" ref={lottie_container}></div>
          <a href="#top">
            <div className="to_top_container">
              <div className="to_top_subcontainer">
                <div className="middle_line"></div>
              </div>
              <p className="to_top_text">BACK TO TOP</p>
            </div>
          </a>
      </div>
    </div>
  );
}
