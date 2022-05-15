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
import { useTrackStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";

const AudioPlayer = () => {
  const { playerAudio, audioPreviousTrack, audioNextTrack } = useTrackStore();

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
  }, [playerAudio]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.2;
      play();
    }
  }, []);

  return (
    <div className={styles.container} aria-label="Audio Player" role="region">
      <audio
        src={playerAudio!.audioFile}
        ref={audioPlayer as any}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndSong}
        data-testid="audio"
        id="audio1"
      ></audio>
      <div className={styles.content}>
        <div className={styles.track}>
          <div className={styles.photo}>
            <img
              src={playerAudio!.imgFile}
              alt="track"
              className={styles.img}
            />
          </div>
          <div className={styles.info}>
            <p className={styles.title} data-testid="song_title">
              {playerAudio!.title}
            </p>
            <p className={styles.author}>{playerAudio!.authors.join(" ")}</p>
          </div>
          <button className={styles.button}>
            ${playerAudio!.cost}.00
            <AiOutlineShopping className={styles.icon} />
          </button>
        </div>
        <div className={styles.controls}>
          <div className={styles.buttons}>
            <div
              className={styles.previous}
              onClick={audioPreviousTrack}
              data-testid="play_previous"
            >
              <BsFillSkipStartFill className={styles.icon} />
            </div>
            <button
              className={styles.play}
              onClick={isPlaying ? pause : play}
              data-testid="play_button"
              aria-controls="audio1"
            >
              {isPlaying ? (
                <FaPause
                  className={cx(styles.icon, styles.iconSmall)}
                  data-testid="play_button_pause-icon"
                />
              ) : (
                <IoPlay
                  className={styles.icon}
                  data-testid="play_button_play-icon"
                />
              )}
            </button>
            <div
              className={styles.next}
              onClick={audioNextTrack}
              data-testid="play_next"
            >
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
              data-testid="volume"
              value={volume}
              aria-valuetext="seek audio bar"
              aria-valuemax={100}
              aria-valuemin={0}
              ria-valuenow={volume}
              role="slider"
              onChange={handleVolumeChange}
            />
          </div>
        </div>
        <div className={styles.mobile}>
          <button className={styles.button}>
            ${playerAudio!.cost}.00
            <AiOutlineShopping className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(AudioPlayer);
