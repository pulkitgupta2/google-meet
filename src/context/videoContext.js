import { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
};

export const RoomContextProvider = ({ children }) => {
  const [videoON, setVideoON] = useState(true);
  const [audioON, setAudioON] = useState(true);

  const value = { videoON, setVideoON, audioON, setAudioON };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
