import useSound from "use-sound";

import clickSound from "../assets/sounds/click_sound.mp3";
import boingSound from "../assets/sounds/boing.mp3";
import pauseSound from "../assets/sounds/pause.mp3";

type UseSoundsType = {
  soundEnabled: boolean;
};
export const useSounds = ({ soundEnabled }: UseSoundsType) => {
  const [playClickSound] = useSound(clickSound, {
    soundEnabled,
  });
  const [playBoingSound] = useSound(boingSound, {
    soundEnabled,
    volume: 0.25,
  });
  const [playPauseSound] = useSound(pauseSound);

  return {
    playClickSound,
    playBoingSound,
    playPauseSound,
  };
};
