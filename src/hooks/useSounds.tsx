import useSound from "use-sound";

const boingSound = "https://s3.amazonaws.com/cdn.avatartion.com/boing.mp3";
const clickSound =
  "https://s3.amazonaws.com/cdn.avatartion.com/click_sound.mp3";
const pauseSound = "https://s3.amazonaws.com/cdn.avatartion.com/pause.mp3";

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
