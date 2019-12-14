import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../Models/Playlist';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {

  playlist: Playlist;
  userLocal;

  constructor(private service: PlaylistService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.find(id).subscribe(result => {
      this.playlist = result;
    })
  }

}
