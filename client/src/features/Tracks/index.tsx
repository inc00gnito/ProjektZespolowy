import React from "react";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import styles from "./Tracks.module.scss";
import HomeLayout from "Layout/Home";
const index = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <AudioPlayer />
        <div>contianer1</div>
      </div>
    </HomeLayout>
  );
};

export default index;
