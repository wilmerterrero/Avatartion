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
          <div className="flex space-x-2 md:space-x-4">
            <AvatarTooltip text="Face">
              <AvatarPartPicker
                path={avatar.head.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Faces",
                    part: "head",
                    src: "faces/Face",
                    qty: 8,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Hair">
              <AvatarPartPicker
                path={avatar.hair.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Hairs",
                    part: "hair",
                    src: "hairs/Hair",
                    qty: 32,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Eyes">
              <AvatarPartPicker
                path={avatar.eyes.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Eyes",
                    part: "eyes",
                    src: "eyes/Eye",
                    qty: 6,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Mouth">
              <AvatarPartPicker
                path={avatar.mouth.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Mouths",
                    part: "mouth",
                    src: "mouths/Mouth",
                    qty: 10,
                  })
                }
              />
            </AvatarTooltip>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            <AvatarTooltip text="Outfit">
              <AvatarPartPicker
                path={avatar.outfit.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Outfits",
                    part: "outfit",
                    src: "outfits/Outfit",
                    qty: 25,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Accessories" width={60}>
              <AvatarPartPicker
                path={avatar.accessories.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Accessories",
                    part: "accessories",
                    src: "accessories/Accessory",
                    qty: 10,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Others" width={60}>
              <AvatarPartPicker
                path={avatar.facialHair.src}
                onClick={() =>
                  openAvatarModalPicker({
                    title: "Facial Hair",
                    part: "facialHair",
                    src: "facial-hair/FacialHair",
                    qty: 8,
                  })
                }
              />
            </AvatarTooltip>
            <AvatarTooltip text="Background" width={60}>
              <AvatarBackgroundPicker
                color={avatar.bg}
                onClick={() => openAvatarBackgroundModal()}
              />
            </AvatarTooltip>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            <AvatarTooltip text="Randomize" width={60}>
              <AvatarPartPicker
                path="base/Reload"
                onClick={() => handleRandomizeAvatar()}
              />
            </AvatarTooltip>
            <AvatarTooltip text="Download" width={60}>
              <AvatarPartPicker
                path="base/Download"
                onClick={() => handleDownloadAvatar()}
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
