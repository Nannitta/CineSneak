import { create } from "zustand";

interface State {
  isInPictureMode: boolean,
  isMinimize: boolean,
  openPictureMode: () => void,
  closePictureMode: () => void,
  minimizePictureMode: () => void
}

export const useInPictureModeStore = create<State>((set) => ({
  isInPictureMode: false,
  isMinimize: false,
  openPictureMode: () => set({ isInPictureMode: true }),
  closePictureMode: () => set({ isInPictureMode: false }),
  minimizePictureMode: () => set({ isMinimize: true})
}));