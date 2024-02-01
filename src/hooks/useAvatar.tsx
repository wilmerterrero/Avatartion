import { useRef, useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import { backgrounds } from "../constants/backgrounds";
import { useSounds } from "./useSounds";
import toast from "react-hot-toast";

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

type AvatarPartPicker = {
  text: string;
  path: string;
  title: string;
  part: string;
  src: string;
  qty: number;
  width?: number;
  isModal?: boolean;
};

type UseAvatarValues = {
  avatar: Avatar;
  avatarModal: AvatarModal;
  avatarPartsPickers: AvatarPartPicker[];
  restAvatarPartsPickers: AvatarPartPicker[];
  activePart: string;
  avatarCanvasRef: React.MutableRefObject<HTMLDivElement | null>;
  isAvatarModalPickerOpen: boolean;
  isBackgroundModalOpen: boolean;
  isDownloadOptionModalOpen: boolean;
  setAvatar: React.Dispatch<React.SetStateAction<Avatar>>;
  setIsAvatarModalPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBackgroundModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDownloadOptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAvatarModalPicker: (avatarModal: AvatarModal) => void;
  closeAvatarModalPicker: (part: string, src: string) => void;
  openAvatarBackgroundModal: () => void;
  openAvatarDownloadOptionModal: () => void;
  handleDownloadAvatarPNG: () => void;
  handleDownloadAvatarSVG: () => void;
  handleRandomizeAvatar: () => void;
  generateShareURL: () => void;
  serialize: () => string;
  deserialize: (serializedAvatar: string) => boolean;
};

type UseAvatarType = {
  soundEnabled: boolean;
};

const randomPart = (src: string, qty: number) =>
  `${src}${Math.floor(Math.random() * qty + 1)
    .toString()
    .padStart(2, "0")}`;

export const useAvatar = ({ soundEnabled }: UseAvatarType): UseAvatarValues => {
  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [isAvatarModalPickerOpen, setIsAvatarModalPickerOpen] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isDownloadOptionModalOpen, setIsDownloadOptionModalOpen] =
    useState(false);
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (!deserialize(urlParams.get("shared") || "")) {
      if (urlParams.has("shared")) {
        toast.error("The shared avatar is invalid, randomizing...");
      }

      setAvatar({
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
    }
  }, []);

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

  const openAvatarDownloadOptionModal = () => {
    playClickSound();
    setIsDownloadOptionModalOpen(true);
  };

  const handleDownloadAvatarPNG = async () => {
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
  };

  const handleDownloadAvatarSVG = async () => {
    const svgContainer = document.getElementById("avatar-canvas-container");
    const parts = Array.from(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      svgContainer?.querySelectorAll("svg")!,
      (svg) => ({
        html: svg.outerHTML,
        zIndex: window.getComputedStyle(svg).getPropertyValue("z-index"),
      })
    );
    parts.sort((a, b) => parseInt(a.zIndex) - parseInt(b.zIndex));
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg">${parts
      .map((part) => part.html)
      .join("")}</svg>`;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const objectURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectURL;
    link.download = "avatartion.svg";
    link.click();
    URL.revokeObjectURL(objectURL);
    playClickSound();
  };

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

  const generateShareURL = () => {
    const url = `${window.location.origin}?shared=${serialize()}`;

    const shareData = {
      title: "Avatartion",
      text: "Check out my avatar!",
      url,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const serialize = useCallback(() => {
    const parts = {
      bg: avatar.bg,
      body: avatar.body.src.replace("base/Body", ""),
      hair: avatar.hair.src.replace("hairs/Hair", ""),
      eyes: avatar.eyes.src.replace("eyes/Eye", ""),
      mouth: avatar.mouth.src.replace("mouths/Mouth", ""),
      head: avatar.head.src.replace("faces/Face", ""),
      outfit: avatar.outfit.src.replace("outfits/Outfit", ""),
      accessories: avatar.accessories.src.replace("accessories/Accessory", ""),
      facialHair: avatar.facialHair.src.replace("facial-hair/FacialHair", ""),
    };

    const buffer = new Uint8Array(9);
    buffer[0] = 0; // FIXME: add suffix for the body too in the assets folder
    buffer[1] = Number(parts.hair);
    buffer[2] = Number(parts.eyes);
    buffer[3] = Number(parts.mouth);
    buffer[4] = Number(parts.head);
    buffer[5] = Number(parts.outfit);
    buffer[6] = Number(parts.accessories);
    buffer[7] = Number(parts.facialHair);
    buffer[8] = backgrounds.indexOf(parts.bg);
    buffer[8] = buffer[8] === -1 ? 0 : buffer[8];

    const serializedAvatar = btoa(
      [...buffer].map((b) => String.fromCharCode(b)).join("")
    );

    return serializedAvatar;
  }, [avatar]);

  const deserialize = useCallback((serializedAvatar: string) => {
    if (!serializedAvatar) return false;

    try {
      const buffer = Uint8Array.from(
        atob(serializedAvatar),
        (c) => c.charCodeAt(0) || 1
      );
      if (buffer.length !== 9) return false;

      const parts = [...buffer].map((b) => b.toString().padStart(2, "0"));
      const background = backgrounds[buffer[8]];

      setAvatar({
        bg: background,
        body: { src: "base/Body" },
        hair: { src: `hairs/Hair${parts[1]}` },
        eyes: { src: `eyes/Eye${parts[2]}` },
        mouth: { src: `mouths/Mouth${parts[3]}` },
        head: { src: `faces/Face${parts[4]}` },
        outfit: { src: `outfits/Outfit${parts[5]}` },
        accessories: { src: `accessories/Accessory${parts[6]}` },
        facialHair: { src: `facial-hair/FacialHair${parts[7]}` },
      });
    } catch (error) {
      return false;
    }

    return true;
  }, []);

  const avatarPartsPickers: AvatarPartPicker[] = [
    {
      text: "Face",
      path: avatar?.head?.src || "faces/Face01",
      title: "Faces",
      part: "head",
      src: "faces/Face",
      qty: 8,
      width: 60,
      isModal: true,
    },
    {
      text: "Hair",
      path: avatar?.hair?.src || "hairs/Hair01",
      title: "Hairs",
      part: "hair",
      src: "hairs/Hair",
      qty: 32,
      width: 60,
      isModal: true,
    },
    {
      text: "Eyes",
      path: avatar?.eyes?.src || "eyes/Eye01",
      title: "Eyes",
      part: "eyes",
      src: "eyes/Eye",
      qty: 6,
      width: 60,
      isModal: true,
    },
    {
      text: "Mouth",
      path: avatar?.mouth?.src || "mouths/Mouth01",
      title: "Mouths",
      part: "mouth",
      src: "mouths/Mouth",
      qty: 10,
      width: 60,
      isModal: true,
    },
    {
      text: "Outfit",
      path: avatar?.outfit?.src || "outfits/Outfit01",
      title: "Outfits",
      part: "outfit",
      src: "outfits/Outfit",
      qty: 25,
      width: 60,
      isModal: true,
    },
    {
      text: "Accessories",
      path: avatar?.accessories?.src || "accessories/Accessory01",
      title: "Accessories",
      part: "accessories",
      src: "accessories/Accessory",
      qty: 10,
      width: 60,
      isModal: true,
    },
    {
      text: "Others",
      path: avatar?.facialHair?.src || "facial-hair/FacialHair01",
      title: "Facial Hair",
      part: "facialHair",
      src: "facial-hair/FacialHair",
      qty: 8,
      width: 60,
      isModal: true,
    },
    {
      text: "Background",
      path: avatar?.bg || "bg-transparent",
      title: "Backgrounds",
      part: "bg",
      src: "bg-transparent",
      qty: 0,
      width: 60,
      isModal: true,
    },
  ];

  const excludedAvatarPartsPickers = ["facialHair", "accessories", "bg"];
  const filteredAvatarPartsPickers = avatarPartsPickers.filter(
    (picker) => !excludedAvatarPartsPickers.includes(picker.part)
  );
  const restAvatarPartsPickers = avatarPartsPickers.filter((picker) =>
    excludedAvatarPartsPickers.includes(picker.part)
  );

  return {
    avatar,
    avatarPartsPickers: filteredAvatarPartsPickers,
    restAvatarPartsPickers,
    isAvatarModalPickerOpen,
    isBackgroundModalOpen,
    isDownloadOptionModalOpen,
    avatarModal,
    activePart,
    avatarCanvasRef,
    setAvatar,
    setIsAvatarModalPickerOpen,
    setIsBackgroundModalOpen,
    setIsDownloadOptionModalOpen,
    openAvatarModalPicker,
    closeAvatarModalPicker,
    openAvatarBackgroundModal,
    handleDownloadAvatarPNG,
    handleDownloadAvatarSVG,
    handleRandomizeAvatar,
    openAvatarDownloadOptionModal,
    generateShareURL,
    serialize,
    deserialize,
  };
};
