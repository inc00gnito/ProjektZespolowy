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
