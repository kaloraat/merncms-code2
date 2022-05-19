import { useState, createContext } from "react";

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState({
    images: [],
    selected: "",
    showMediaModal: false,
  });

  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
