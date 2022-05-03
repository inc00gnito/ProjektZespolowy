import { ITrack } from "./Track";

export interface ICartItem extends ITrack {
  quantity: number;
}
