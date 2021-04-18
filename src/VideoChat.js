import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Room from "./Room";
import { Header, Hero } from "./components";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./context/appContext";
import { CircularProgress } from "@material-ui/core";

const VideoChat = () => {
  const [roomName, setRoomName] = useState(uuidv4());
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");

  const { currentUser, connecting, setConnecting } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = useCallback(async () => {
    setConnecting(true);
    const data = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    Video.connect(data.token, {
      name: roomName,
    })
      .then((room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  }, [roomName, username]);

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  console.log("room name is", roomName);
  console.log("username is", username);
  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <>
        {connecting ? (
          <div className="loading animate__backInLeft">
            <CircularProgress />
            <h1 className="loading_text">Loading...</h1>
          </div>
        ) : (
          <>
            <Header />

            <Hero
              username={username}
              roomName={roomName}
              handleSubmit={handleSubmit}
              connecting={connecting}
              setRoomName={setRoomName}
            />
          </>
        )}
      </>
    );
  }
  return render;
};

export default VideoChat;
