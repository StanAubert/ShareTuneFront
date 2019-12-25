import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { Playlist } from '../Models/Playlist';
import { pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  playlists: Playlist[];

  // id: string;

  // localId: string;

  userId: number;

  constructor(private service: PlaylistService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')
    this.userService.find(this.userId).subscribe(result => {
      this.playlists = result.playlists;
    })
  }

}
