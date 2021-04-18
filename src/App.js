import React from "react";
import "./App.css";
import VideoChat from "./VideoChat";
import { Header, Signin } from "./components";
import { useAppContext } from "./context/appContext";
const App = () => {
  const { appState } = useAppContext();

  return (
    <div className="app">
      {appState === "empty" && <div></div>}
      {appState === "home" && (
        <>
          <main>
            <VideoChat />
          </main>
        </>
      )}
      {appState === "login" && <Signin />}
    </div>
  );
};

export default App;
