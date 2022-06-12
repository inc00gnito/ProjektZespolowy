import React from "react";
import styles from "./TrackListItem.module.scss";
import { BsDownload } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { ITrack } from "app/model/Track";
import { useCartStore, useTrackStore } from "app/provider/Provider";
import { createCloudinaryDownLink } from "app/utils/Link";

interface IProps {
  track: ITrack;
}

const TrackListItem: React.FC<IProps> = ({ track }) => {
  const { addCartItem } = useCartStore();
  const { setAudioPlayerTrack } = useTrackStore();
  const downloadLink = createCloudinaryDownLink(track.audioFile);
  return (
    <li
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={() => setAudioPlayerTrack(track)}
      data-testid="track_item"
    >
      <div className={styles.column}>
        <div className={styles.picture}>
          <img
            src={track.imgFile}
            alt="track"
            className={styles.img}
            data-testid="track_item_img"
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>
          <span
            className={styles.text}
            title={String(track.time)}
            data-testid="track_item_title"
          >
            {track.title}
          </span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.time}>
          <span className={styles.text} data-testid="track_item_time">
            {track.time}
          </span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.tagsList} data-testid="track_item_tags">
          {track.tags &&
            track.tags.map((tag) => (
              <div className={styles.tag} key={tag}>
                <span
                  className={styles.text}
                  title={"#" + tag}
                  data-testid="track_item_tag"
                >
                  #{tag}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.column} onClick={(e) => e.stopPropagation()}>
        <div className={styles.download}>
          <a href={downloadLink} download className={styles.link}>
            <BsDownload className={styles.icon} />
          </a>
        </div>
        <button className={styles.shop} onClick={() => addCartItem(track)}>
          <span className={styles.price} data-testid="track_item_price">
            ${track.cost}
          </span>
          <AiOutlineShopping className={styles.icon} />
        </button>
      </div>
    </li>
  );
};

export default TrackListItem;
