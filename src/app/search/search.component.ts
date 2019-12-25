import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Playlist } from "../Models/Playlist";
import { PlaylistService } from "../playlist.service";
import { Tag } from "../Models/Tag";
import { UserService } from "../user.service";
import { User } from "../Models/User";
import { Song } from "../Models/Song";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  loading = false;

  search = "";
  playlists: Playlist[];
  tags: Tag[];
  users: User[];
  songs: Song[];
  filter = "all";
  form = new FormGroup({
    search: new FormControl()
  });

  constructor(
    private service: PlaylistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.service.all().subscribe(result => {
      this.playlists = result;
    });

    this.service.allTags().subscribe(result => {
      this.tags = result;
    });

    this.userService.all().subscribe(result => {
      this.users = result;
    });

    this.service.allSongs().subscribe(result => {
      this.songs = result;
    });
  }
  handleSearch(e: KeyboardEvent) {
    this.search = (event.target as HTMLInputElement).value.toLowerCase();
  }
  filterSearch(value) {
    this.filter = value;
  }
}
