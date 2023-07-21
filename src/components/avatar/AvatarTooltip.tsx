import { ReactNode, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useMediaQuery } from '@react-hook/media-query';

type Props = {
  text: string;
  width?: number;
  children: ReactNode;
};

export const AvatarTooltip = ({ text, width = 20, children }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div
        className="inline-block"
        onMouseEnter={() => {
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
      >
        {children}
      </div>
      <Transition
        show={showTooltip}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={`absolute z-10 w-${width} p-2 bg-black rounded-lg shadow-lg -top-[110px] left-1/2 transform -translate-x-1/2`}
        >
          <p className="text-white">{text}</p>
        </div>
      </Transition>
    </div>
  );
};
