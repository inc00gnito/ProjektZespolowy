import React from "react";
import styles from "./TrackListItem.module.scss";
import { BsDownload } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { ITrack } from "app/model/Track";
import { useCartStore } from "app/provider/Provider";

interface IProps {
  track: ITrack;
}

const TrackListItem: React.FC<IProps> = ({ track }) => {
  const { addCartItem } = useCartStore();
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.picture}>
          <img src={track.imgFile} alt="track" className={styles.img} />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>
          <span className={styles.text} title={String(track.time)}>
            {track.title}
          </span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.time}>
          <span className={styles.text}>{track.time}</span>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.tagsList}>
          {track.tags &&
            track.tags.map((tag) => (
              <div className={styles.tag}>
                <span className={styles.text} title={"#" + tag}>
                  #{tag}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.download}>
          <BsDownload className={styles.icon} />
        </div>
        <button className={styles.shop} onClick={() => addCartItem(track)}>
          <span className={styles.price}>${track.cost}</span>
          <AiOutlineShopping className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default TrackListItem;
