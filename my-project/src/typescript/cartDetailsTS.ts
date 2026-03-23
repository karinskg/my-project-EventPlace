export interface ICartDetail {
  name: string;
  date: string;
  time: string;
  state: string;
  city: string;
  country: string;
  segment: string;
  genre: string;
  info: string;
  id: string;
  images: Image[];
  seatmap:string
}

export interface Image {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}
