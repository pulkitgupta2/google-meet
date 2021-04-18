import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/appContext";
import "animate.css";
import { RoomContextProvider } from "./context/videoContext";

ReactDOM.render(
  <AppContextProvider>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </AppContextProvider>,
  document.getElementById("root")
);
