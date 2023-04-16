
let muted = false

function playSound(sound:string) {
  const sample = <HTMLAudioElement>document.getElementById(sound);
  sample?.play();
}

function muteSounds() {
  muted = true
  const sounds = document.querySelectorAll('audio');
  const videos = document.querySelectorAll('video');

  sounds.forEach((audioElement: Node) => {
    const sound = audioElement as HTMLAudioElement;
    sound.muted = true;
  })
  videos.forEach((videoElement: Node) => {
    const video = videoElement as HTMLVideoElement;
    video.muted = true;
  })
}

function unMuteSound() {
  muted = false
  const sounds = document.querySelectorAll('audio');
  const videos = document.querySelectorAll('video');

  sounds.forEach((audioElement: Node) => {
    const sound = audioElement as HTMLAudioElement;
    sound.muted = false;
  })
  videos.forEach((videoElement: Node) => {
    const video = videoElement as HTMLVideoElement;
      video.muted = false;
  })
}

function toggleBackgroundSound(muteState: string) {
  const sound = document.querySelector('#bg_ambience') as HTMLAudioElement;
  if (sound != null) { 
    if (muted == false) {      
      if (muteState == "unmute") {
        sound.muted = false;
      } else if (muteState == "mute") {
        sound.muted = true;
      }
    }
  }
}

function reduceVolume(sample: string, amount: number) {
  const target = document.querySelector(`#${sample}`);
  const sound = target as HTMLAudioElement;
  sound.volume = amount;    
}

export {
  playSound,
  muteSounds,
  unMuteSound,
  toggleBackgroundSound,
  reduceVolume
}