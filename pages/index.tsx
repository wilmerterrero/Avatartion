import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AvatarBackgroundPicker } from '~/components/AvatarBackgroundPicker';
import { AvatarCanvas } from '~/components/AvatarCanvas';
import { AvatarPartPicker } from '~/components/AvatarPartPicker';
import { AvatarTooltip } from '~/components/AvatarTooltip';
import html2canvas from 'html2canvas';

const randomPart = (src: string, qty: number) =>
  `${src}${Math.floor(Math.random() * qty + 1)
    .toString()
    .padStart(2, '0')}`;

const colors = [
  'bg-white',
  'bg-red-300',
  'bg-yellow-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-indigo-300',
  'bg-purple-300',
  'bg-pink-300',
];

export default function Home() {
  const [avatar, setAvatar] = useState({
    bg: 'bg-red-300',
    body: { src: 'base/Body' },
    hair: { src: 'hairs/Hair01' },
    eyes: { src: 'eyes/Eye01' },
    mouth: { src: 'mouths/Mouth01' },
    head: { src: 'faces/Face01' },
    outfit: { src: 'outfits/Outfit01' },
    accessories: { src: 'accessories/Accessory01' },
  });
  const avatarCanvasRef = useRef<HTMLDivElement | null>(null);

  const randomize = () => {
    setAvatar({
      bg: colors[Math.floor(Math.random() * colors.length)],
      body: { src: 'base/Body' },
      hair: { src: `${randomPart('hairs/Hair', 32)}` },
      eyes: { src: `${randomPart('eyes/Eye', 6)}` },
      mouth: { src: `${randomPart('mouths/Mouth', 10)}` },
      head: { src: `${randomPart('faces/Face', 8)}` },
      outfit: { src: `${randomPart('outfits/Outfit', 25)}` },
      accessories: { src: `${randomPart('accessories/Accessory', 18)}` },
    });
  };

  const handleDownload = useCallback(async () => {
    if (avatarCanvasRef.current === null) {
      return;
    }

    const canvas = await html2canvas(avatarCanvasRef.current),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');

    link.href = data;
    link.download = 'avatartion.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [avatarCanvasRef]);

  useEffect(() => {
    setAvatar({
      bg: 'bg-red-300',
      body: { src: 'base/Body' },
      hair: { src: `${randomPart('hairs/Hair', 32)}` },
      eyes: { src: `${randomPart('eyes/Eye', 6)}` },
      mouth: { src: `${randomPart('mouths/Mouth', 10)}` },
      head: { src: `${randomPart('faces/Face', 8)}` },
      outfit: { src: `${randomPart('outfits/Outfit', 25)}` },
      accessories: { src: `${randomPart('accessories/Accessory', 18)}` },
    });
  }, []);

  return (
    <>
      <Head>
        <title>Avatartion - Create Your Notion-Style Avatar</title>
        <meta
          name="description"
          content="Generate a personalized Notion-style avatar."
        />
        <meta
          name="keywords"
          content="Avatartion, Notion, avatar, customizable"
        />
        <meta name="author" content="wilterrero" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Create Your Notion-Style Avatar with Avatartion | Customizable Avatars"
        />
        <meta
          property="og:description"
          content="Avatartion is the perfect tool to generate a personalized Notion-style avatar. With Avatartion, you can create a unique avatar by choosing different facial features, clothing, and accessories."
        />
        <meta property="og:image" content="https://avatartion.com/avatartion_og.png" />
        <meta property="og:url" content="https://avatartion.com" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Create Your Notion-Style Avatar with Avatartion | Customizable Avatars"
        />
        <meta
          name="twitter:description"
          content="Avatartion is the perfect tool to generate a personalized avatar that resembles the Notion-style icons. With Avatartion, you can create a unique avatar by choosing different facial features, clothing, and accessories."
        />
        <meta
          name="twitter:image"
          content="https://avatartion.com/avatartion_og.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="min-h-screen">
        <div className="mx-auto p-4 text-center sm:w-3/4 md:w-1/2">
          <div className="flex items-center justify-center mb-4">
            <h1 className="font-bold text-3xl">Avatartion</h1>
          </div>
          <div className="flex items-center justify-center h-[350px] md:h-[400px]">
            <AvatarCanvas {...avatar} ref={avatarCanvasRef} />
          </div>
          <div className="fixed bottom-10 md:bottom-1/3 left-0 w-full bg-white flex items-center justify-center">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-3 space-y-2">
              <div className="flex space-x-2 md:space-x-4">
                <AvatarTooltip text="Face">
                  <AvatarPartPicker
                    path={avatar.head.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        head: { src: `${randomPart('faces/Face', 8)}` },
                      })
                    }
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Hair">
                  <AvatarPartPicker
                    path={avatar.hair.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        hair: { src: `${randomPart('hairs/Hair', 32)}` },
                      })
                    }
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Eyes">
                  <AvatarPartPicker
                    path={avatar.eyes.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        eyes: { src: `${randomPart('eyes/Eye', 6)}` },
                      })
                    }
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Mouth">
                  <AvatarPartPicker
                    path={avatar.mouth.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        mouth: { src: `${randomPart('mouths/Mouth', 10)}` },
                      })
                    }
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Outfit">
                  <AvatarPartPicker
                    path={avatar.outfit.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        outfit: { src: `${randomPart('outfits/Outfit', 25)}` },
                      })
                    }
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Accessories" width={60}>
                  <AvatarPartPicker
                    path={avatar.accessories.src}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        accessories: {
                          src: `${randomPart('accessories/Accessory', 18)}`,
                        },
                      })
                    }
                  />
                </AvatarTooltip>
              </div>
              <div className="flex space-x-2 md:space-x-4">
                <AvatarTooltip text="Download" width={60}>
                  <AvatarPartPicker
                    path="base/Download"
                    onClick={() => handleDownload()}
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Randomize" width={60}>
                  <AvatarPartPicker
                    path="base/Reload"
                    onClick={() => randomize()}
                  />
                </AvatarTooltip>
                <AvatarTooltip text="Background" width={60}>
                  <AvatarBackgroundPicker
                    color={avatar.bg}
                    onClick={() =>
                      setAvatar({
                        ...avatar,
                        bg: colors[Math.floor(Math.random() * colors.length)],
                      })
                    }
                  />
                </AvatarTooltip>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pt-5">
                <p className="text-sm">
                  Made by{' '}
                  <a className="" href="https://twitter.com/wilterrero">
                    Wilmer Terrero
                  </a>
                </p>
                <span className="text-gray-400 text-sm hidden md:block">|</span>
                <p className="text-sm">
                  Artwork by <a href="https://www.drawkit.com/">Drawkit</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
