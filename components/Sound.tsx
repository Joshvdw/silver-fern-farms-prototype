import { reduceVolume } from "@/utils/audio";
import React, { useEffect } from "react";

export default function Sound () {

  useEffect(() => {
    reduceVolume('transition', 0.05)
    reduceVolume('reverse', 0.05)
  }, [])
  
  return (
    <div className="audio_elements">
      <audio src="/sound/ui_click.mp3" id="ui_click" />
      <audio src="/sound/bg_ambience.mp3" id="bg_ambience" loop />
      <audio src="/sound/transition.mp3" id="transition" />
      <audio src="/sound/reverse.mp3" id="reverse" />
    </div>
  )
}