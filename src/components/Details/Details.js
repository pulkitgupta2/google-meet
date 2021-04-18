import { Button, TextField } from "@material-ui/core";
import { Chat, Clear, People } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import "./styles.css";

const Details = ({ participants, participant, roomName }) => {
  const totalParticipants = participants?.length + 1;

  console.log(participant.identity);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    db.collection(roomName).add({
      sender: participant.identity,
      message,
    });
  };

  useEffect(() => {
    db.collection(roomName).onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((item) => item.data()));
    });
  }, [roomName]);

  return (
    <div className="details">
      <div className="details_header">
        <h1>Meeting Details</h1>
        <Clear />
      </div>

      <div className="details_tabs">
        <div className="deatils_activebar"></div>
        <div className="details_tab ">
          <People />
          <p>People ({totalParticipants})</p>
        </div>

        <div className="details_tab deatils_tab--active">
          <Chat />
          <p>Chat</p>
        </div>
      </div>
      {messages.map((item) => (
        <p
          style={{
            textAlign: item.sender !== participant.identity && "end",
            margin: "10px 0",
          }}
        >
          {item.sender} :{item.message}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say HI!"
        variant="outlined"
      />

      <Button onClick={sendMessage} variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default Details;
