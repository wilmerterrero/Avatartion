import { useLocalStorage } from "usehooks-ts";

import { AvatarBackgroundModal } from "./components/avatar/AvatarBackgroundModal";
import { AvatarBackgroundPicker } from "./components/avatar/AvatarBackgroundPicker";
import { AvatarCanvas } from "./components/avatar/AvatarCanvas";
import { AvatarPartModal } from "./components/avatar/AvatarPartModal";
import { AvatarPartPicker } from "./components/avatar/AvatarPartPicker";
import { AvatarTooltip } from "./components/avatar/AvatarTooltip";
import { backgrounds } from "./constants/backgrounds";
import { Footer } from "./components/Footer";

import { useAvatar } from "./hooks/useAvatar";
import { useSounds } from "./hooks/useSounds";

function App() {
  const [soundEnabled, setSoundEnabled] = useLocalStorage("soundEnabled", true);
  const {
    avatar,
    avatarPartsPickers,
    isAvatarModalPickerOpen,
    isBackgroundModalOpen,
    avatarModal,
    avatarCanvasRef,
    setAvatar,
    setIsAvatarModalPickerOpen,
    setIsBackgroundModalOpen,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarBackgroundModal,
    handleDownloadAvatar,
    handleRandomizeAvatar,
  } = useAvatar({ soundEnabled });

  const { playPauseSound } = useSounds({ soundEnabled });

  const toggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    if (enabled) {
      playPauseSound();
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="mx-auto text-center sm:w-3/4 md:w-1/2">
        <div className="flex items-center justify-center pt-5 md:pt-[5vh] mb-4 md:mb-0">
          <h1 className="font-bold text-3xl">Avatartion</h1>
        </div>
        <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
          <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
        </div>
        <AvatarPartModal
          {...avatarModal}
          isOpen={isAvatarModalPickerOpen}
          onPartSelected={(part, src) => closeAvatarModalPicker(part, src)}
          onClose={() => setIsAvatarModalPickerOpen(false)}
        />
        <AvatarBackgroundModal
          isOpen={isBackgroundModalOpen}
          backgrounds={backgrounds}
          activeBackground={avatar.bg}
          onBackgroundSelected={(bg) =>
            setAvatar((prev) => ({
              ...prev,
              bg,
            }))
          }
          onClose={() => setIsBackgroundModalOpen(false)}
        />
        <div className="flex flex-col items-center justify-center px-4 pt-6 space-y-2">
          <div className="w-[280px] md:w-[400px] overflow-y-auto">
            <div className="flex space-x-2 md:space-x-4">
              {avatarPartsPickers.map((picker) => (
                <AvatarTooltip
                  key={picker.path}
                  text={picker.text}
                  width={picker.width}
                >
                  <AvatarPartPicker
                    path={picker.path}
                    onClick={() => openAvatarModalPicker(picker)}
                  />
                </AvatarTooltip>
              ))}
            </div>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            <AvatarTooltip text="Background" width={60}>
              <AvatarBackgroundPicker
                color={avatar.bg}
                onClick={() => openAvatarBackgroundModal()}
              />
            </AvatarTooltip>
            <AvatarTooltip text="Download" width={60}>
              <AvatarPartPicker
                path="base/Download"
                onClick={() => handleDownloadAvatar()}
              />
            </AvatarTooltip>
            <AvatarTooltip text="Randomize" width={60}>
              <AvatarPartPicker
                path="base/Reload"
                onClick={() => handleRandomizeAvatar()}
              />
            </AvatarTooltip>
            <AvatarTooltip text="Sound" width={60}>
              <AvatarPartPicker
                path={`base/${soundEnabled ? "SoundLoud" : "SoundOff"}`}
                onClick={() => toggleSound(!soundEnabled)}
              />
            </AvatarTooltip>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
