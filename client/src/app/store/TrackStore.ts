import { ITrack } from "app/model/Track";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import agent from "app/api/agent";
import { Genre } from "app/utils/Filters";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";

export default class TrackStore {
  constructor() {
    makeAutoObservable(this);
  }

  tracksBestsellers: ITrack[] = [];
  tracks: ITrack[] = [];
  playerAudio: ITrack | null = null;

  setAudioPlayerTrack = (track: ITrack) => {
    this.playerAudio = track;
  };
  audioPreviousTrack = () => {
    if (!this.playerAudio) return;
    let id = this.tracks.findIndex((item) => item.id == this.playerAudio!.id);
    if (id === 0) id = this.tracks.length - 1;
    else id--;

    this.playerAudio = this.tracks[id];
  };

  audioNextTrack = () => {
    console.log("next null?");
    if (!this.playerAudio) return;
    console.log("next track?");
    let id = this.tracks.findIndex((item) => item.id == this.playerAudio!.id);
    if (id === this.tracks.length - 1) id = 0;
    else id++;
    console.log(id);
    this.playerAudio = this.tracks[id];
  };

  loadBestsellers = async () => {
    try {
      const { data } = await agent.Track.listBestsellers();
      runInAction(() => {
        this.tracksBestsellers = data;
      });
    } catch (err) {
      if (!axios.isAxiosError(err)) return console.log("fd");
      console.log("backend error");
    }
  };

  loadTracks = async () => {
    try {
      const { data } = await agent.Track.list();
      this.tracks = data;
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };

  loadFilteredTracks = async (filter: number) => {
    try {
      const { data } = await agent.Track.listFiltered(filter);
      this.tracks = data;
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };

  loadSortedByTracks = async (sortBy: number) => {
    try {
      const { data } = await agent.Track.listSortedBy(sortBy);
      this.tracks = data;
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };
}
