import { ITrackDetails } from "./Track";

export interface ICartItemDetails extends ITrackDetails {
  quantity: number;
}
