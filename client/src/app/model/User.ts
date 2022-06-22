import { ITrack } from "./Track";

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface IOrder {
  id: number;
  tracks: ITrack[];
  price: number;
  dateOfPurchase: Date;
}
