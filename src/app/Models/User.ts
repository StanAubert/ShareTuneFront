import { Playlist } from './Playlist';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  description: string;
  profilePicture: string;
  playlists: Playlist;
}
