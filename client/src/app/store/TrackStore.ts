import { ITrack } from "app/model/Track";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import agent from "app/api/agent";
import { Genre } from "app/utils/Filters";

export default class TrackStore {
  constructor() {
    makeAutoObservable(this);
  }

  tracksBestsellers: ITrack[] = [];
  tracks: ITrack[] = [];

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
