import React, { useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import styles from "./Tracks.module.scss";
import HomeLayout from "Layout/Home/Home";
import TrackList from "./components/TrackList/TrackList";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";
import { useTrackStore } from "app/provider/Provider";

const Tracks = () => {
  const { loadTracks } = useTrackStore();

  useEffect(() => {
    loadTracks();
  }, []);
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.filters}>
            <Filters />
          </div>
          <div className={styles.trackList}>
            <TrackList />
          </div>
          <div className={styles.audioPlayer}>
            <AudioPlayer />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Tracks;
