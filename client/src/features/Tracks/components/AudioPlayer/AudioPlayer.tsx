import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.scss";
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
    id: 2,
    name: "Flamingo dance",
    author: "flaming",
    mp3: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    demo: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    picture: Flaming,
    price: 20,
  },
  {
    id: 3,
    name: "BUCH jak gorąco",
    author: "Młoda",
    mp3: "https://res.cloudinary.com/trackslance/video/upload/v1649794978/special%20track/Chad_ls5wcg.wav",
    demo: "https://res.cloudinary.com/trackslance/video/upload/v1649794978/special%20track/Chad_ls5wcg.wav",
    picture:
      "https://res.cloudinary.com/trackslance/image/upload/v1649794955/special%20track/k1_dk4pg2.jpg",
    price: 50,
  },
];

const AudioPlayer = () => {
  const [volume, setVolume] = useState("20");
  const [timeTracker, setTimeTrakcer] = useState("0");
  const audioPlayer = useRef<HTMLAudioElement>();
  const [isPlaying, setPlaying] = useState(false);
  const [trackNumber, setTrackNumber] = useState(0);

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

  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const event = e.target as any;
    const duration = event.duration;
    const currentTime = event.currentTime;
    let progress = (currentTime / duration) * 100;
    if (isNaN(progress)) {
      progress = 0;
    }
    setTimeTrakcer(String(progress));
  };

  const handleTimeTrackerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeTrakcer(e.target.value);
    if (audioPlayer.current) {
      const duration = audioPlayer.current.duration;
      const progress = duration * (Number(e.target.value) / 100);
      audioPlayer.current.currentTime = progress;
    }
  };

  const handleEndSong = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) play();
  }, [trackNumber]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.2;
    }
  }, []);

  const style = {
    menuList: (base: any) => ({
      ...base,
  
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    })
  }
  

  return (
    <div className={styles.container}>
      <audio
        src={mp3List[trackNumber].mp3}
        ref={audioPlayer as any}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndSong}
      ></audio>
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
          <div className={styles.buttons}>
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
          <div className={styles.timeTrack}>
            <input
              type="range"
              className={styles.range}
              style={
                {
                  "--progress": `linear-gradient(to right, #ff0dbf 0,#ff0dbf ${timeTracker}%, #e1e1e1 ${timeTracker}%, #e1e1e1 100%)`,
                } as any
              }
              min={0}
              max={100}
              step={0.1}
              value={timeTracker}
              onChange={handleTimeTrackerChange}
            />
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
                  "--progress": `linear-gradient(to right, #ff0dbf 0, #ff0dbf ${volume}%,  #e2e2e2 ${volume}%, #e2e2e2 100%)`,
                } as any
              }
              min={0}
              max={100}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
        <div className={styles.mobile}>
          <button className={styles.button}>
            ${mp3List[trackNumber].price}.00
            <AiOutlineShopping className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
