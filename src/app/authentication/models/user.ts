import { Playlist } from 'src/app/Models/Playlist';

export interface User {
  email: string;
  name: string;
  id: number;
  roles: string[];
  password: string;
  description: string;
  profilePicture: string;
  playlists: Playlist;
}
