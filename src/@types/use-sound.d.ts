/// <reference types="howler" />

declare module "use-sound" {
  export declare type SpriteMap = {
    [key: string]: [number, number];
  };
  export declare type HookOptions<T = any> = T & {
    id?: string;
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: SpriteMap;
    onload?: () => void;
  };
  export interface PlayOptions {
    id?: string;
    forceSoundEnabled?: boolean;
    playbackRate?: number;
  }
  export declare type PlayFunction = (options?: PlayOptions) => void;
  export interface ExposedData {
    sound: Howl | null;
    stop: (id?: string) => void;
    pause: (id?: string) => void;
    duration: number | null;
  }
  export declare type ReturnedValue = [PlayFunction, ExposedData];
  export default function useSound<T = any>(src: string | string[], { id, volume, playbackRate, soundEnabled, interrupt, onload, ...delegated }?: HookOptions<T>): ReturnedValue;

}
