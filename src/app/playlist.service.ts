import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Playlist } from "./Models/Playlist";
import { Tag } from "./Models/Tag";
import youtubeId from "get-youtube-id";
import { Song } from "./Models/Song";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  find(id: number) {
    return this.http.get<Playlist>("http://localhost:3500/api/playlists/" + id);
  }
  all() {
    return this.http.get<Playlist[]>("http://localhost:3500/api/playlists");
  }
  add(playlist: Playlist) {
    return this.http.post<Playlist>(
      "http://localhost:3500/api/playlists",
      playlist
    );
  }
  update(playlist: Playlist) {
    return this.http.put<Playlist>(
      "http://localhost:3500/api/playlists/" + playlist.id,
      playlist
    );
  }
  remove(id: number) {
    return this.http.delete<Playlist>(
      "http://localhost:3500/api/playlists/" + id
    );
  }

  // SONG SECTION

  allSongs() {
    return this.http.get<Song[]>("http://localhost:3500/api/songs");
  }

  getSongInfo(code: string) {
    return this.http.get<any>(
      "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAx4e6z4J-gZ2gHphzTzBVq6r1wOTGJwo8&id=" +
        code +
        "&part=snippet,contentDetails"
    );
  }

  addSong(song: Song) {
    return this.http.post<Song>("http://localhost:3500/api/songs", song);
  }

  updateSong(song: Song) {
    return this.http.put<Song>(
      "http://localhost:3500/api/songs/" + song.id,
      song
    );
  }

  findSong(id: number) {
    return this.http.get<Song>("http://localhost:3500/api/songs/" + id);
  }

  songRemove(id: number) {
    return this.http.delete<Song>("http://localhost:3500/api/songs/" + id);
  }

  UrlToIdConverter(url) {
    const getYouTubeID = youtubeId;
    const id = getYouTubeID(url);
    return id;
  }

  // TAGS SECTION

  allTags() {
    return this.http.get<Tag[]>("http://localhost:3500/api/tags");
  }

  findTag(id: number) {
    return this.http.get<Tag>("http://localhost:3500/api/tags/" + id);
  }
}
