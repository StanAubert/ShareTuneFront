import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from './Models/Playlist';
import { Tag } from './Models/Tag';
import youtubeId from 'get-youtube-id';
import { Song } from './Models/Song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  find(id: number) {
    return this.http.get<Playlist>("http://localhost:3500/api/playlists/" + id
    );
  }

  all() {
    return this.http.get<Playlist[]>("http://localhost:3500/api/playlists"
    );
  }

  allTags() {
    return this.http.get<Tag>("http://localhost:3500/api/tags")
  }

  add(playlist: Playlist) {
    return this.http.post<Playlist>("http://localhost:3500/api/playlists", playlist)
  }
  update(playlist: Playlist) {
    return this.http.put<Playlist>("http://localhost:3500/api/playlists/" + playlist.id, playlist)
  }

  getSongInfo(code: string) {
    return this.http.get<any>("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAx4e6z4J-gZ2gHphzTzBVq6r1wOTGJwo8&id=" + code + "&part=snippet,contentDetails")
  }

  addSong(song: Song) {
    return this.http.post<Song>("http://localhost:3500/api/songs", song)
  }

  test(url) {
    const getYouTubeID = youtubeId;
    const id = getYouTubeID(url);
    return id;
  }
}
