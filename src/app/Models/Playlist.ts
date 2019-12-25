import { User } from './User';
import { Tag } from './Tag';
import { Song } from './Song';

export interface Playlist {
  id?: number;
  title: string;
  decription: string;
  user: User;
  tags: Tag;
  songs: Song[];
}
