import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AvatarButtonPickerContainer } from "./AvatarButtonPickerContainer";
import { AvatarPartPagination } from "./AvatarPartPagination";
import { AvatarPart } from "./AvatarPart";

type Props = {
  title: string;
  part: string;
  src: string;
  qty: number;
  isOpen: boolean;
  activePart?: string;
  onClose: () => void;
  onPartSelected: (part: string, src: string) => void;
};

export const AvatarPartModal = ({
  title,
  part,
  src,
  qty,
  isOpen,
  activePart,
  onPartSelected,
  onClose,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(qty / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const itemsToDisplay = [...Array(itemsPerPage)].map((_, i) => startIndex + i);
  const isPaginationVisible = totalPages > 1;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          // reset page
          setCurrentPage(1);
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
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm">
                    Click any to select and close this window
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Parts available: {qty}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-10 md:grid-cols-4 md:gap-4 py-4 -mx-2 md:-mx-4 px-4 justify-items-center items-center">
                  {itemsToDisplay.map((index) => {
                    if (index >= qty) return null;
                    const path = `${src}${(index + 1)
                      .toString()
                      .padStart(2, "0")}`;
                    const hasSelectedPart = activePart === path;
                    return (
                      <AvatarButtonPickerContainer
                        key={path}
                        className={`h-24 w-24 p-10 border-2 ${
                          hasSelectedPart ? "border-blue-500" : "border-black"
                        } rounded-xl overflow-hidden relative`}
                        onClick={() => {
                          onPartSelected(part, path);
                          onClose();
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <AvatarPart path={path} />
                        </div>
                      </AvatarButtonPickerContainer>
                    );
                  })}
                </div>
                {isPaginationVisible && (
                  <AvatarPartPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
