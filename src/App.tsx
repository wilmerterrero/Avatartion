import { useLocalStorage, useMediaQuery } from "usehooks-ts";

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
import { Selector } from "./components/parts/Selector";

const Title = () => <h1 className="font-bold text-3xl">Avatartion</h1>;

function App() {
  const [soundEnabled, setSoundEnabled] = useLocalStorage("soundEnabled", true);
  const {
    avatar,
    avatarPartsPickers,
    restAvatarPartsPickers,
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

  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    if (enabled) {
      playPauseSound();
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        {!isMobile ? (
          <div className="mx-auto text-center w-[750px] h-auto">
            <div className="flex items-center justify-center pt-5 md:pt-[5vh] mb-4 md:mb-0">
              <Title />
            </div>
            <div className="flex items-center justify-center relative">
              <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
                <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
              </div>
              <div className="absolute -right-6">
                <div className="flex space-x-6">
                  <div className="flex flex-col space-y-4">
                    {avatarPartsPickers.map((picker) => (
                      <AvatarTooltip
                        key={picker.path}
                        text={picker.text}
                        width={picker.width}
                      >
                        <div className="flex items-center">
                          <AvatarPartPicker
                            path={picker.path}
                            onClick={() => openAvatarModalPicker(picker)}
                          />
                          {picker.isModal && (
                            <Selector
                              onSelectorClick={() =>
                                openAvatarModalPicker(picker)
                              }
                            />
                          )}
                        </div>
                      </AvatarTooltip>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-4">
                    {restAvatarPartsPickers.map((picker) => (
                      <AvatarTooltip
                        key={picker.path}
                        text={picker.text}
                        width={picker.width}
                      >
                        <div className="flex items-center">
                          {picker.part !== "bg" ? (
                            <AvatarPartPicker
                              path={picker.path}
                              onClick={() => openAvatarModalPicker(picker)}
                            />
                          ) : (
                            <AvatarBackgroundPicker
                              color={avatar.bg}
                              onClick={() => openAvatarBackgroundModal()}
                            />
                          )}
                          {picker.isModal && (
                            <Selector
                              onSelectorClick={() =>
                                picker.part !== "bg"
                                  ? openAvatarModalPicker(picker)
                                  : openAvatarBackgroundModal()
                              }
                            />
                          )}
                        </div>
                      </AvatarTooltip>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute left-24">
                <div className="flex flex-col space-y-2 md:space-y-4">
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
              </div>
            </div>
            <div className="flex flex-col items-center justify-center px-4 space-y-2">
              <Footer />
            </div>
          </div>
        ) : (
          <div className="mx-auto text-center sm:w-3/4 md:w-1/2">
            <div className="flex items-center justify-center pt-5 md:pt-[5vh] mb-4 md:mb-0">
              <Title />
            </div>
            <div className="flex items-center justify-center h-[44vh] md:h-[47vh]">
              <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center px-4 pt-6 space-y-2 w-[350px] overflow-x-auto">
                <div className="flex space-x-2 md:space-x-4 ">
                  {[...avatarPartsPickers, ...restAvatarPartsPickers].map(
                    (picker) => (
                      <AvatarTooltip
                        key={picker.path}
                        text={picker.text}
                        width={picker.width}
                      >
                        <div className="flex items-center overflow-x-auto">
                          {picker.part !== "bg" ? (
                            <AvatarPartPicker
                              path={picker.path}
                              onClick={() => openAvatarModalPicker(picker)}
                            />
                          ) : (
                            <AvatarBackgroundPicker
                              color={avatar.bg}
                              onClick={() => openAvatarBackgroundModal()}
                            />
                          )}
                          {picker.isModal && (
                            <Selector
                              onSelectorClick={() =>
                                picker.part !== "bg"
                                  ? openAvatarModalPicker(picker)
                                  : openAvatarBackgroundModal()
                              }
                            />
                          )}
                        </div>
                      </AvatarTooltip>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex space-x-2 md:space-x-4 pt-6">
                <AvatarTooltip text="Download" width={60}>
                  <AvatarPartPicker
                    path="base/Download"
                    onClick={() => openAvatarBackgroundModal()}
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
            </div>
            <Footer />
          </div>
        )}
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
      {/* <AvatarDownloadOptionModal
        isOpen={isDownloadOptionModalOpen}
        onDownloadOption={(option: "SVG" | "PNG") =>
          option === "SVG"
            ? handleDownloadAvatarSVG()
            : handleDownloadAvatarPNG()
        }
        onClose={() => setIsDownloadOptionModalOpen(false)}
      /> */}
    </>
  );
}

export default App;
