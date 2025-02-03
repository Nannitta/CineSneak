import { create } from 'zustand';

interface State {
  isInPictureMode: boolean,
  isMinimize: boolean,
  isHover: boolean,
  openPictureMode: () => void,
  closePictureMode: () => void,
  minimizePictureMode: () => void
  setHover: (isHover: boolean) => void
}

export const useInPictureModeStore = create<State>((set) => ({
  isInPictureMode: false,
  isMinimize: false,
  isHover: false,
  openPictureMode: () => set({ isInPictureMode: true }),
  closePictureMode: () => set({ isInPictureMode: false, isMinimize: false }),
  minimizePictureMode: () => set({ isMinimize: true, isHover: false }),
  setHover: (isHover) => set({ isHover })
}));