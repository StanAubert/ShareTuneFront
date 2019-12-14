import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { concat } from 'rxjs/operators';
import { Song } from '../Models/Song';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {

  playlistId: number;

  newSong: Song;

  importedTitle: string;
  importedDescription: string;
  importedDuration: string;
  importedThumbnail: string;


  form = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    duration: new FormControl(),
    code: new FormControl(),
    playlist: new FormControl()
  })


  constructor(private service: PlaylistService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.playlistId = +this.route.snapshot.paramMap.get('id');
  }

  handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    const code = this.service.test(this.form.get('code').value)
    const song = this.service.getSongInfo(code).subscribe(resp => {

      this.form.get('title').patchValue(resp.items[0].snippet.title);
      this.form.get('description').patchValue(resp.items[0].snippet.description);
      this.form.get('duration').patchValue(resp.items[0].contentDetails.duration);


      const data = { ... this.form.value };

      data.playlist = "/api/playlists/" + this.playlistId;

      data.code = code

      this.newSong = { ...data };

      console.log(data);
    }, e => console.log(e),

      () => {
        this.service.addSong(this.newSong).subscribe();
        this.router.navigateByUrl("/playlist/" + this.playlistId);
      })


    console.log(this.newSong);

  }

}
