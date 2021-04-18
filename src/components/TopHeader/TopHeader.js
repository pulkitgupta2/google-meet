import { Badge } from "@material-ui/core";
import { ChatOutlined, PeopleAltOutlined } from "@material-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

const TopHeader = ({ participant, participants }) => {
  const [videoTracks, setVideoTracks] = useState([]);

  const videoRef = useRef();

  const connectedParticiapnts = participants ? participants.length + 1 : 1;

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  return (
    <div className="top_header">
      <div className="top-header-item">
        <Badge badgeContent={connectedParticiapnts}>
          <PeopleAltOutlined className="" />
        </Badge>
      </div>

      <div className="top-header-item second-item">
        <ChatOutlined className="" />
      </div>
      <div className="top-header-item video_item">
        <video className="top_header_video" ref={videoRef} autoPlay={true} />
      </div>
    </div>
  );
};

export default TopHeader;
