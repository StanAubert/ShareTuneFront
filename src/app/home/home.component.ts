import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { PlaylistService } from "../playlist.service";
import { Tag } from "../Models/Tag";
import { Playlist } from "../Models/Playlist";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  word = document.querySelector("#word");
  idInterval = null;
  refreshTimer = 1000;
  tags: Tag[] = [];
  playlists: Playlist[] = [];

  constructor(private service: PlaylistService) {}

  ngOnDestroy() {
    clearInterval(this.idInterval);
  }

  ngOnInit() {
    this.service.allTags().subscribe(result => {
      this.tags = result;
      this.idInterval = setInterval(function() {
        const randomElementIndex = Math.floor(
          Math.random() * Math.floor(result.length)
        );
        this.word.innerText = result[randomElementIndex].title.toUpperCase();
      }, this.refreshTimer);
    });
  }
}
