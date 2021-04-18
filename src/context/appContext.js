import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState("empty");
  const [connecting, setConnecting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAppState("home");
        setCurrentUser(user);
        console.log(user);
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  const value = {
    appState,
    currentUser,
    connecting,
    setConnecting,
    snackbarOpen,
    setSnackbarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
