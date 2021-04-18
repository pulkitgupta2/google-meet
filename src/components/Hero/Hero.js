import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import { Keyboard, VideoCallOutlined } from "@material-ui/icons";
import React from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

const Hero = ({ setRoomName, handleSubmit }) => {
  const newMeeting = () => {
    setRoomName(uuidv4());
    handleSubmit();
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__featureText">
          <h1 className="hero__title">
            Premium video meetings. Now free for everyone
          </h1>
          <p className="hero__subtitle">
            We re-engineered the service we built for secure buisness meetings,
            Google Meet, to make sure it free and available for all
          </p>
        </div>

        <div className="hero__buttons">
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="hero__createBTN"
          >
            <VideoCallOutlined />
            <p>New Meeting</p>
          </Button>

          <TextField
            className="hero__input"
            variant="outlined"
            onChange={handleRoomNameChange}
            placeholder="Enter a code or link "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard className="icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button className="hero__joinBTN" onClick={handleSubmit}>
            Join
          </Button>
        </div>

        <Divider />

        <p className="hero__learnMore">Learn more about Google Meet</p>
      </div>

      <div className="hero__right">
        <img
          className="hero__image"
          src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
          alt="Feature IMG"
        />
      </div>
    </div>
  );
};

export default Hero;
