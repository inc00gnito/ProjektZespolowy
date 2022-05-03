import { Enum } from "app/model/global";

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
