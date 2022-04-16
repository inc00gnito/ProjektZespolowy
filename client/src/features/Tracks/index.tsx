import React from "react";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import styles from "./Tracks.module.scss";
import HomeLayout from "Layout/Home/Home";
import TrackList from "./components/TrackList/TrackList";

const index = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <TrackList />
        <AudioPlayer />
        <div style={{ color: "black" }}>Kuba tu był</div>
      </div>
    </HomeLayout>
  );
};

export default index;
