import { createContext, useContext } from "react";
import TrackList from "../TrackList";
import { ITrack } from "app/model/Track";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import { render, screen } from "@testing-library/react";

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
  tracks: ITrack[] = tracks;
}

class CartStore {
  constructor() {}
}

const stores = {
  trackStore: new TrackStore(),
  cartStore: new CartStore(),
};

const Context = createContext(stores);

const useAppStore = () => {
  const appStore = useContext(Context);
  return appStore;
};

jest.mock("app/provider/Provider", () => ({
  useCartStore() {
    const { cartStore } = useAppStore();
    return cartStore;
  },
  useTrackStore() {
    const { trackStore } = useAppStore();
    return trackStore;
  },
}));

describe("track list", () => {
  it("do list items render properly", () => {
    render(<TrackList />);
    const tracksList = screen.getAllByTestId("track_item");
    expect(tracksList).toHaveLength(2);

    tracks.forEach((_, index) => {
      const title = screen.getAllByTestId("track_item_title")[index];
      expect(title.textContent).toBe(tracks[index].title);

      const photo = screen.getAllByAltText("track")[index];
      expect(photo).toBeTruthy();

      const trackTime = screen.getAllByTestId("track_item_time")[index];
      expect(trackTime.textContent).toBe(String(tracks[index].time));

      const tags = screen.getAllByTestId("track_item_tags")[index];
      expect(tags?.textContent).toBe("#" + tracks[index].tags.join("#"));

      const price = screen.getAllByTestId("track_item_price")[index];
      expect(price.textContent).toBe("$" + tracks[index].cost);
    });
  });
});
