import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "../playlist.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { concat } from "rxjs/operators";
import { Song } from "../Models/Song";

@Component({
  selector: "app-song-form",
  templateUrl: "./song-form.component.html",
  styleUrls: ["./song-form.component.css"]
})
export class SongFormComponent implements OnInit {
  loading = false;

  playlistId: number;

  newSong: Song;

  song: Song = null;
  type = "hidden";

  importedTitle: string;
  importedDescription: string;
  importedDuration: string;
  importedThumbnail: string;

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl(),
    duration: new FormControl("", Validators.required),
    code: new FormControl(),
    playlist: new FormControl()
  });

  constructor(
    private service: PlaylistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.playlistId = +this.route.snapshot.paramMap.get("id");

    if (this.route.snapshot.url[0].path == "song") {
      const id = +this.route.snapshot.paramMap.get("id");
      if (id) {
        this.type = "text";
        this.service.findSong(+id).subscribe(result => {
          this.loading = true;
          this.song = result;
          this.form.patchValue(this.song);
        });
      }
    }
  }

  handleSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.song !== null) {
      const data = { ...this.form.value };
      data.id = this.song.id;
      this.service.updateSong(data).subscribe(result => {
        const playlistId = this.song.playlist.replace("/api/playlists/", "");
        this.playlistId = +playlistId;
        this.router.navigateByUrl("/playlist/" + playlistId);
      });
    } else {
      const code = this.service.UrlToIdConverter(this.form.get("code").value);
      const song = this.service.getSongInfo(code).subscribe(
        resp => {
          this.form.get("title").patchValue(resp.items[0].snippet.title);
          this.form
            .get("description")
            .patchValue(resp.items[0].snippet.description);
          this.form
            .get("duration")
            .patchValue(resp.items[0].contentDetails.duration);

          const data = { ...this.form.value };

          data.playlist = "/api/playlists/" + this.playlistId;

          data.code = code;

          this.newSong = { ...data };

          console.log(data);
        },
        e => console.log(e),

        () => {
          this.service.addSong(this.newSong).subscribe();
          this.router.navigateByUrl("/playlist/" + this.playlistId);
        }
      );
      console.log(this.newSong);
    }
  }

  isDefined(prop) {
    if (typeof prop == undefined) {
      return false;
    } else {
      return true;
    }
  }

  back() {
    const playlistId = this.song.playlist.replace("/api/playlists/", "");
    this.playlistId = +playlistId;
    this.router.navigateByUrl("/playlist/" + playlistId);
  }
}
