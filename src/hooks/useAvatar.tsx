import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";

import { backgrounds } from "../constants/backgrounds";
import { useSounds } from "./useSounds";

type AvatarPart = {
  src: string;
};

type Avatar = {
  bg: string;
  body: AvatarPart;
  hair: AvatarPart;
  eyes: AvatarPart;
  mouth: AvatarPart;
  head: AvatarPart;
  outfit: AvatarPart;
  accessories: AvatarPart;
  facialHair: AvatarPart;
};

type AvatarModal = {
  title: string;
  part: string;
  src: string;
  qty: number;
  activePart?: string;
};

type UseAvatarValues = {
  avatar: Avatar;
  avatarModal: AvatarModal;
  activePart: string;
  avatarCanvasRef: React.MutableRefObject<HTMLDivElement | null>;
  isAvatarModalPickerOpen: boolean;
  isBackgroundModalOpen: boolean;
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
  setIsAvatarModalPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBackgroundModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAvatarModalPicker: (avatarModal: AvatarModal) => void;
  closeAvatarModalPicker: (part: string, src: string) => void;
  openAvatarBackgroundModal: () => void;
  handleDownloadAvatar: () => void;
  handleRandomizeAvatar: () => void;
};

type UseAvatarType = {
  soundEnabled: boolean;
};

const randomPart = (src: string, qty: number) =>
  `${src}${Math.floor(Math.random() * qty + 1)
    .toString()
    .padStart(2, "0")}`;

export const useAvatar = ({ soundEnabled }: UseAvatarType): UseAvatarValues => {
  const [avatar, setAvatar] = useState<Avatar>({
    bg: "bg-red-300",
    body: { src: "base/Body" },
    hair: { src: `${randomPart("hairs/Hair", 32)}` },
    eyes: { src: `${randomPart("eyes/Eye", 6)}` },
    mouth: { src: `${randomPart("mouths/Mouth", 10)}` },
    head: { src: `${randomPart("faces/Face", 8)}` },
    outfit: { src: `${randomPart("outfits/Outfit", 25)}` },
    accessories: { src: `${randomPart("accessories/Accessory", 10)}` },
    facialHair: { src: `${randomPart("facial-hair/FacialHair", 8)}` },
  });
  const [isAvatarModalPickerOpen, setIsAvatarModalPickerOpen] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [avatarModal, setAvatarModal] = useState<AvatarModal>({
    title: "",
    part: "",
    src: "",
    qty: 0,
    activePart: "",
  });
  const [activePart, setActivePart] = useState("");
  const avatarCanvasRef = useRef<HTMLDivElement | null>(null);

  const { playClickSound, playBoingSound } = useSounds({ soundEnabled });

  const handleRandomizeAvatar = () => {
    playBoingSound();
    setAvatar({
      bg: backgrounds[Math.floor(Math.random() * backgrounds.length)],
      body: { src: "base/Body" },
      hair: { src: `${randomPart("hairs/Hair", 32)}` },
      eyes: { src: `${randomPart("eyes/Eye", 6)}` },
      mouth: { src: `${randomPart("mouths/Mouth", 10)}` },
      head: { src: `${randomPart("faces/Face", 8)}` },
      outfit: { src: `${randomPart("outfits/Outfit", 25)}` },
      accessories: { src: `${randomPart("accessories/Accessory", 10)}` },
      facialHair: { src: `${randomPart("facial-hair/FacialHair", 8)}` },
    });
    setActivePart("");
  };

  const openAvatarBackgroundModal = () => {
    playClickSound();
    setIsBackgroundModalOpen(true);
  };

  const handleDownloadAvatar = useCallback(async () => {
    if (avatarCanvasRef.current === null || avatar === null) {
      return;
    }

    const options =
      avatar.bg === "bg-transparent"
        ? {
            backgroundColor: null,
          }
        : {};

    const canvas = await html2canvas(avatarCanvasRef.current, options),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "avatartion";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    playClickSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, avatarCanvasRef]);

  const openAvatarModalPicker = ({
    title,
    part,
    src,
    qty,
  }: {
    title: string;
    part: string;
    src: string;
    qty: number;
  }) => {
    setIsAvatarModalPickerOpen(true);
    playClickSound();
    setAvatarModal({ title, src, part, qty, activePart });
  };

  const closeAvatarModalPicker = (part: string, src: string) => {
    setIsAvatarModalPickerOpen(false);
    playClickSound();
    setActivePart(src);
    setAvatar((prev) => ({
      ...prev,
      [part]: { src },
    }));
  };

  return {
    avatar,
    isAvatarModalPickerOpen,
    isBackgroundModalOpen,
    avatarModal,
    activePart,
    avatarCanvasRef,
    setAvatar,
    setIsAvatarModalPickerOpen,
    setIsBackgroundModalOpen,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarBackgroundModal,
    handleDownloadAvatar,
    handleRandomizeAvatar,
  };
};
