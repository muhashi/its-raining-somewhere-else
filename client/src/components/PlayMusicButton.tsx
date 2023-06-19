
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

export default function PlayMusicButton() {
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#controlling_sound
    if (!audioRef || !audioRef.current || audioContext) return;
    const newAudioContext = new AudioContext();
    const track = newAudioContext.createMediaElementSource(audioRef.current);
    track.connect(newAudioContext.destination);
    setAudioContext(newAudioContext);

    if (newAudioContext?.state === "suspended") {
      newAudioContext.resume();
    }
  }, [audioRef]);

  return (
    <>
      <button
        ref={buttonRef}
        data-playing="false"
        role="switch"
        aria-checked="false"
        className="remove-button-styles"
        onClick={() => {
          if (audioContext?.state === "suspended") {
            audioContext.resume();
          }
      
          // Play or pause track depending on state
          if (buttonRef.current?.dataset.playing === "false") {
            audioRef.current?.play();
            buttonRef.current.dataset.playing = "true";
            setAudioOn(true);
          } else if (buttonRef.current?.dataset?.playing === "true") {
            audioRef.current?.pause();
            buttonRef.current.dataset.playing = "false";
            setAudioOn(false);
          }
        }}
      >
        { audioOn ? <IconVolume size={40} color="white" /> : <IconVolumeOff size={40} color="white" /> }
      </button>
      <audio ref={audioRef} src="/song.mp3" loop></audio>
    </>
  );
}
