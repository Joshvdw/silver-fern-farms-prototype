import { reduceVolume } from "@/hooks/utils/audio";
import React, { useEffect } from "react";

export default function Sound () {

  useEffect(() => {
    reduceVolume('transition', 0.1)
  }, [])
  
  return (
    <div className="audio_elements">
      <audio src="/sound/ui_click.mp3" id="ui_click" />
      <audio src="/sound/bg_ambience.mp3" id="bg_ambience" loop />
      <audio src="/sound/transition.mp3" id="transition" />
    </div>
  )
}