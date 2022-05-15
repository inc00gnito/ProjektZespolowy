import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import TrackListItem from "./TrackListItem";
import styles from "./TrackList.module.scss";
import { useTrackStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";

const TrackList = () => {
  const { tracks } = useTrackStore();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.column}></div>
        <div className={styles.column}>
          <span className={styles.name}>TITLE</span>
        </div>
        <div className={styles.column}>
          <span className={styles.name}>TIME</span>
        </div>
      </div>
      <ul data-testid="track_list">
        {tracks.map((track) => (
          <TrackListItem track={track} key={track.id} />
        ))}
      </ul>
    </div>
  );
};

export default observer(TrackList);
