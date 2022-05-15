import AudioPlayer from "../AudioPlayer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ITrack } from "app/model/Track";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import { createContext, useContext } from "react";

const tracks: ITrack[] = [
  {
    id: 1,
    title: "What is love",
    authors: ["PIG"],
    time: 20,
    cost: 20,
    discountedByUser: 0,
    discountedByShop: 0,
    genre: 0,
    tags: ["abc", "dsa"],
    audioFile: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    demoFile: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    imgFile: WhatIsLove,
    timesSold: 0,
    isDiscounted: false,
  },
  {
    id: 2,
    title: "Flamingo dance",
    authors: ["flaming"],
    time: 50,
    cost: 30,
    discountedByUser: 0,
    discountedByShop: 0,
    genre: 1,
    tags: ["dSA$@#"],
    audioFile: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    demoFile: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    imgFile: Flaming,
    timesSold: 0,
    isDiscounted: false,
  },
];

class TrackStore {
  playerAudio: ITrack = tracks[0];
  audioPreviousTrack = () => {
    this.playerAudio = tracks[0];
  };
  audioNextTrack = () => {
    this.playerAudio = tracks[1];
  };
  resetStore = () => {
    this.playerAudio = tracks[0];
  };
}

const stores = {
  trackStore: new TrackStore(),
};

const Context = createContext(stores);

const useAppStore = () => {
  const appStore = useContext(Context);
  return appStore;
};

jest.mock("app/provider/Provider", () => ({
  useTrackStore() {
    const { trackStore } = useAppStore();
    return trackStore;
  },
}));

describe("audio player tests", () => {
  afterEach(() => {
    stores.trackStore.resetStore();
  });
  it("does player starts play song instantly after render", () => {
    const playMock = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => new Promise((r) => r));
    render(<AudioPlayer />);
    const pauseIcon = screen.queryByTestId("play_button_pause-icon");
    expect(pauseIcon).toBeTruthy();

    expect(playMock).toHaveBeenCalledTimes(1);
    playMock.mockClear();
  });

  it("does the next button changes song and play it instantly while listening", () => {
    const playMock = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => new Promise((r) => r));
    render(<AudioPlayer />);

    waitFor(() => {
      const nextSongButton = screen.getByTestId("play_next");
      fireEvent.click(nextSongButton);

      expect(playMock).toHaveBeenCalledTimes(2);
      playMock.mockClear();
    });
  });

  it("change song, expect song name to change", () => {
    render(<AudioPlayer />);

    let titleText = screen.getByTestId("song_title");
    expect(titleText.textContent).toBe(tracks[0].title);

    waitFor(() => {
      const nextSongButton = screen.getByTestId("play_next");

      fireEvent.click(nextSongButton);
      titleText = screen.getByTestId("song_title");
      expect(titleText.textContent).toBe(tracks[1].title);

      const previousSongButton = screen.getByTestId("play_previous");

      fireEvent.click(previousSongButton);
      titleText = screen.getByTestId("song_title");
      expect(titleText.textContent).toBe(tracks[0].title);
    });
  });

  it("pause song, expect icon changes, player stops", () => {
    const audioStopMock = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => new Promise((r) => r));
    render(<AudioPlayer />);

    const playButton = screen.getByTestId("play_button");
    fireEvent.click(playButton);
    waitFor(() => {
      const playIcon = screen.queryByTestId("play_button_play-icon");
      expect(playIcon).toBeTruthy();

      expect(audioStopMock).toHaveBeenCalledTimes(1);
    });
  });

  it("pause song, expect icon changes, player stops", () => {
    const audioStopMock = jest
      .spyOn(window.HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => new Promise((r) => r));
    render(<AudioPlayer />);

    const playButton = screen.getByTestId("play_button");
    fireEvent.click(playButton);
    waitFor(() => {
      const playIcon = screen.queryByTestId("play_button_play-icon");
      expect(playIcon).toBeTruthy();

      expect(audioStopMock).toHaveBeenCalledTimes(1);
    });
  });

  it("input range change(volume), expect audio volume to change", () => {
    render(<AudioPlayer />);

    waitFor(() => {
      const volumeButton = screen.getByTestId("volume");
      fireEvent.change(volumeButton, { target: { value: 0.6 } });
      const audio: HTMLMediaElement = screen.getByTestId("audio");
      expect(audio.volume).toBe(0.6);
    });
  });
});
