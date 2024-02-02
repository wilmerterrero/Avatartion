import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AvatarButtonPickerContainer } from "./AvatarButtonPickerContainer";

type Props = {
  isOpen: boolean;
  onDownloadOption: (option: "SVG" | "PNG") => void;
  onClose: () => void;
};

export const AvatarDownloadOptionModal = ({
  isOpen,
  onDownloadOption,
  onClose,
}: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Download options
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm">
                    Click any to select and close this window
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-10 md:grid-cols-4 md:gap-4 py-4 -mx-2 md:-mx-4 px-4 justify-items-center items-center">
                  {["SVG", "PNG"].map((option) => {
                    return (
                      <AvatarButtonPickerContainer
                        key={option}
                        className="h-24 w-24 p-10 border-2 border-black rounded-xl overflow-hidden relative"
                        onClick={() => {
                          onDownloadOption(option as "SVG" | "PNG");
                          onClose();
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div>.{option}</div>
                        </div>
                      </AvatarButtonPickerContainer>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <p className="text-sm">
                    Thanks for using Avatartion! ❤️ <br />
                    Consider&nbsp;
                    <a
                      className="text-black underline"
                      href="https://buymeacoffee.com/wilmerterrero"
                    >
                      buy me a coffee
                    </a>{" "}
                    to support the project
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
