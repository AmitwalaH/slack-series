import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreateChannelModal = () => {
  console.log("Dialogue box opened");
  return useAtom(modalState);
};