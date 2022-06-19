import { Enum } from "./global";

export interface ITrack {
  id: number;
  title: string;
  time: number;
  cost: number;
  discountedByUser: number;
  discountedByShop: number;
  genre: number;
  tags: string[];
  authors: string[];
  audioFile: string;
  demoFile: string;
  imgFile: string;
  timesSold: number;
  isDiscounted: boolean;
}

export interface ITrackForm {
  audioFile: File;
  imageFile: File;
  price: number;
  tags: { value: string }[];
  title: string;
  genre: number;
}

export const Genre: Enum = {
  "All genres": -1,
  Rock: 0,
  pop: 1,
  "Pop Rock": 2,
  "Punk Rock": 3,
  "Hip Hop": 4,
  RnB: 5,
  Electronic: 6,
};

export const SortBy: Enum = {
  "sort by": -1,
  "price lowest": 0,
  "price highest": 1,
  "times sold": 2,
  "discounted lowest": 3,
  "discounted highest": 4,
};
export type ITrackFilters = string[];
export type ITrackSearch = string;
export type ITrackSort = number;

export interface ITrackOptions {
  filters?: ITrackFilters;
  sort?: ITrackSort;
  search?: ITrackSearch;
}
