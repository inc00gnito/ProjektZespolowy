import { ITrack, ITrackForm, ITrackOptions } from "app/model/Track";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import agent from "app/api/agent";
import { convertTrackOptionsToParams } from "app/utils/Filters";
import { getAudioLength } from "app/utils/Audio";

export default class TrackStore {
  constructor() {
    makeAutoObservable(this);
  }

  tracksBestsellers: ITrack[] = [];
  tracks: ITrack[] = [];
  playerAudio: ITrack | null = null;
  isSubmitting = false;

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
    if (!this.playerAudio) return;
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

  loadTracks = async (options?: ITrackOptions) => {
    const params = convertTrackOptionsToParams(options);
    try {
      const { data } = await agent.Track.list(params);
      this.tracks = data;
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };

  addTrack = async (track: ITrackForm) => {
    this.isSubmitting = true;
    const duration = await getAudioLength(track.audioFile);

    const uploadTrack = new FormData();
    uploadTrack.append("time", String(duration));
    uploadTrack.append("imageFormFile", track.imageFile);
    uploadTrack.append("audioFormFile", track.audioFile);
    uploadTrack.append("demoFormFile", track.audioFile);
    uploadTrack.append("demoFormFile", track.audioFile);
    track.tags.map((tag) => uploadTrack.append(`tags[]`, tag.value));
    uploadTrack.append("cost", String(track.price));
    uploadTrack.append("title", track.title);
    uploadTrack.append("genre", String(track.genre));
    try {
      await agent.Track.add(uploadTrack);
      runInAction(() => {
        this.isSubmitting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  };
}
