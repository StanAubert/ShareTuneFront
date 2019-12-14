import { Playlist } from './Playlist';

export interface Song {
  id: number;
  title: string;
  description: string;
  duration: string;
  code: string;
  playlist: string;
}
