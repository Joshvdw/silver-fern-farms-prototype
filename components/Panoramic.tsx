import React, { useMemo } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

export default function Panoramic () {

  const projection =  useMemo(() => new EquirectProjection({
    src: "/videos/360_video.mp4",
    video: {
      autoplay: true,
      muted: true,
      loop: true
    }
  }), []);

  return (
    <View360 
      // https://naver.github.io/egjs-view360/docs/api/Class/View360
      projection={projection} 
      className="canvas_360_container" 
      canvasClass="canvas_360"
      wheelScrollable={true}
      fov={90}
      rotate={true}
      gyro={true}
      initialYaw={10}
    />
  )
}