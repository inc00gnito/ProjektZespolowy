import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.scss";
import albumsPhoto from "assets/track1.webp";
import { AiOutlineShopping } from "react-icons/ai";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { ImVolumeMedium } from "react-icons/im";
import { FaPause } from "react-icons/fa";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import cx from "classnames";
const mp3List = [
  {
    id: 1,
    name: "What is love",
    author: "PIG",
    mp3: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    demo: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    picture: WhatIsLove,
    price: 15,
  },
  {
    id: 1,
    name: "Flamingo dance",
    author: "flaming",
    mp3: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    demo: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    picture: Flaming,
    price: 20,
  },
];

const AudioPlayer = () => {
  const [volume, setVolume] = useState("20");
  const audioPlayer = useRef<HTMLAudioElement>();
  const [isPlaying, setPlaying] = useState(false);
  const [trackNumber, setTrackNumber] = useState(0);
  console.log("playing?");
  console.log(isPlaying);
  const play = () => {
    if (audioPlayer.current) {
      setPlaying(true);
      audioPlayer.current.play();
    }
  };

  const pause = () => {
    if (audioPlayer.current) {
      setPlaying(false);
      audioPlayer.current.pause();
    }
  };

  const next = () => {
    let newTrackNumber = trackNumber;
    if (trackNumber < mp3List.length - 1) newTrackNumber = trackNumber + 1;
    else newTrackNumber = 0;
    setTrackNumber(newTrackNumber);
  };

  const previous = () => {
    let newTrackNumber = trackNumber;
    if (trackNumber < 1) {
      newTrackNumber = mp3List.length - 1;
    } else newTrackNumber = trackNumber - 1;
    setTrackNumber(newTrackNumber);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.target.value);
    if (audioPlayer.current) {
      audioPlayer.current.volume = Number(e.target.value) / 100;
    }
  };

  useEffect(() => {
    if (trackNumber > 0) play();
  }, [trackNumber]);

  useEffect(() => {
    if (audioPlayer.current) audioPlayer.current.volume = 0.2;
  }, []);

  return (
    <div className={styles.container}>
      <audio src={mp3List[trackNumber].mp3} ref={audioPlayer as any}></audio>
      <div className={styles.content}>
        <div className={styles.track}>
          <div className={styles.photo}>
            <img
              src={mp3List[trackNumber].picture}
              alt="track"
              className={styles.img}
            />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{mp3List[trackNumber].name}</p>
            <p className={styles.author}>{mp3List[trackNumber].author}</p>
          </div>
          <button className={styles.button}>
            ${mp3List[trackNumber].price}.00
            <AiOutlineShopping className={styles.icon} />
          </button>
        </div>
        <div className={styles.controls}>
          <div className={styles.previous} onClick={previous}>
            <BsFillSkipStartFill className={styles.icon} />
          </div>
          <div className={styles.play} onClick={isPlaying ? pause : play}>
            {isPlaying ? (
              <FaPause className={cx(styles.icon, styles.iconSmall)} />
            ) : (
              <IoPlay className={styles.icon} />
            )}
          </div>
          <div className={styles.next} onClick={next}>
            <BsFillSkipEndFill className={styles.icon} />
          </div>
        </div>
        <div className={styles.volume}>
          <div className={styles.volumeContainer}>
            <ImVolumeMedium className={styles.icon} />
            <input
              type="range"
              className={styles.range}
              style={
                {
                  "--progress": `linear-gradient(to right, #ff0dbf 0,#ff0dbf ${volume}%, black ${volume}%, black 100%)`,
                } as any
              }
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
