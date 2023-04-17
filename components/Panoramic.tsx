import React, { useMemo, useState } from "react";
import View360, { EquirectProjection, EVENTS, LoadStartEvent, LoadEvent, LoadingSpinner } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import "@egjs/react-view360/css/loading-spinner.min.css";
import Loader from "./Loader";
import useStore from "@/hooks/useStore";

export default function Panoramic () {

  // const [isLoaded, setIsLoaded] = useState(true)
  const panoramicLoad = useStore((state: any) => state.panoramicLoad)
  const setPanoramicLoad = useStore((state: any) => state.setPanoramicLoad)
  
  const projection =  useMemo(() => new EquirectProjection({
    src: "/videos/360_video.mp4",
    video: {
      autoplay: true,
      muted: true,
      loop: true
    },
  }), []);

  function onLoadStart(evt: LoadStartEvent) {    
    setPanoramicLoad(false)
  };

  function onLoad(evt: LoadEvent) {
    setPanoramicLoad(true)
  };

  const spinner = useMemo(() => [new LoadingSpinner()], []);
  console.log(projection);
  
  return (
    <>
      <View360 
        // https://naver.github.io/egjs-view360/docs/api/Class/View360
        projection={projection} 
        className="canvas_360_container" 
        canvasClass="canvas_360"
        wheelScrollable={true}
        fov={90}
        rotate={true}
        gyro={true}
        // initialYaw={10}
        on={{
          loadStart: onLoadStart,
          load: onLoad,
        }}
        plugins={spinner}
        />
  
      </>
  )
}