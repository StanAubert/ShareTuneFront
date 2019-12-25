import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../Models/Playlist';
import { YouTubePlayer } from '@angular/youtube-player';
import { Song } from '../Models/Song';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {

  @ViewChild(YouTubePlayer, { static: false })
  player: YouTubePlayer;
  playlist: Playlist;
  userLocal;
  loading = false;
  playerLoaded = false;
  firstSong: Song;
  currentSong: Song;
  firstPlay = false;

  constructor(private service: PlaylistService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.find(id).subscribe(result => {
      this.playlist = result;
      this.loading = true;
      this.currentSong = result.songs[0];
      this.firstSong = result.songs[0];

      result.songs.forEach(song => {
        song.duration = song.duration.replace('PT', '');
        song.duration = song.duration.replace('H', 'h');
        song.duration = song.duration.replace('M', ':');
        song.duration = song.duration.replace('S', 's');
      })
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      this.playerLoaded = true;
    })
  }

  onStateChange(e: YT.OnStateChangeEvent) {
    if (e.data == YT.PlayerState.ENDED) {
      let index = this.playlist.songs.findIndex(song => song === this.currentSong)

      if (index == this.playlist.songs.length - 1) {
        index = 0;
      }
      else {
        index++;
      }

      this.currentSong = this.playlist.songs[index];
      this.player.videoId = this.currentSong.code;
      this.player.playVideo();
    }
  }

  play(song: Song) {
    this.currentSong = song;
    this.player.videoId = this.currentSong.code;
    if (this.player.getPlayerState() == YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
    }
    else {
      this.player.playVideo();
    }
    this.firstPlay = true;
  }

  isPlaying(song: Song) {
    return song == this.currentSong && this.player && (this.player.getPlayerState() == YT.PlayerState.PLAYING || this.player.getPlayerState() == YT.PlayerState.BUFFERING || this.firstPlay) || false;
  }

  // isPaused(song: Song) {
  //   return song !== this.currentSong || (song == this.currentSong && this.player && (this.player.getPlayerState() == YT.PlayerState.PAUSED || !this.firstPlay)) || false;
  // }

  isPaused(song: Song) {
    return !this.isPlaying(song) || (this.player.getPlayerState() == YT.PlayerState.PAUSED);
  }

  delete(id) {
    if (window.confirm("Attention la playlist est sur le point d'être supprimée, voulez-vous continuer ?")) {
      this.service.remove(id).subscribe(
        result => {
          this.router.navigateByUrl("/account/" + this.userLocal.id)
        }
      );
    }

  }
}
