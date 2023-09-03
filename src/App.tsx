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
import { AvatarDownloadOptionModal } from "./components/avatar/AvatarDownloadOptionModal";

function App() {
  const [soundEnabled, setSoundEnabled] = useLocalStorage("soundEnabled", true);
  const {
    avatar,
    avatarPartsPickers,
    availableAvatarPartsPickers,
    isAvatarModalPickerOpen,
    isBackgroundModalOpen,
    isDownloadOptionModalOpen,
    showMoreEnabled,
    avatarModal,
    avatarCanvasRef,
    setAvatar,
    setIsAvatarModalPickerOpen,
    setIsBackgroundModalOpen,
    setIsDownloadOptionModalOpen,
    setShowMoreEnabled,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarBackgroundModal,
    openAvatarDownloadOptionModal,
    handleDownloadAvatarPNG,
    handleDownloadAvatarSVG,
    handleRandomizeAvatar
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
        <AvatarDownloadOptionModal
          isOpen={isDownloadOptionModalOpen}
          onDownloadOption={(option: 'SVG' | 'PNG') => option === 'SVG' ? handleDownloadAvatarSVG() : handleDownloadAvatarPNG()}
          onClose={() => setIsDownloadOptionModalOpen(false)}
          />
        <div className="flex flex-col items-center justify-center px-4 pt-6 space-y-2">
          <div className="relative">
            <div className="flex space-x-2 md:space-x-4">
              <button
                type="button"
                className={`transition-all duration-500 ease-in-out ${
                  showMoreEnabled
                    ? "opacity-100 visible w-8 h-8 pt-4 mr-2"
                    : "opacity-0 invisible w-0 h-0 pt-0"
                }`}
                onClick={() => setShowMoreEnabled(false)}
              >
                <span>Back</span>
              </button>
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
            <div
              className={`absolute top-0 right-[-20px] h-8 w-8 bg-black rounded-full transition-all duration-500 ease-in-out ${
                showMoreEnabled
                  ? "opacity-0 invisible w-0 h-0"
                  : "opacity-100 visible w-8 h-8"
              }`}
            >
              <button
                type="button"
                className="w-full h-full"
                onClick={() => setShowMoreEnabled(true)}
              >
                <span className="text-sm text-white font-bold underline">
                  +{availableAvatarPartsPickers}
                </span>
              </button>
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
                onClick={() => openAvatarDownloadOptionModal()}
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
