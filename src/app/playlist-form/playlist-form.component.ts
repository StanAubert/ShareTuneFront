import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from '../playlist.service';
import { Tag } from '../Models/Tag';
import { User } from '../authentication/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../Models/Playlist';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {
  tags: Tag;

  playlist: Playlist;

  form = new FormGroup({
    title: new FormControl(),
    decription: new FormControl(),
    tags: new FormControl(),
  })

  constructor(private service: PlaylistService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.service.allTags().subscribe(tags => {
      this.tags = tags;
    })

    // on verifie l'id dans l'url
    const id = this.route.snapshot.paramMap.get("id");
    // si il y a un identfiant
    if (id) {
      // on va chercher la playlist à modifier et on applique les données au formulaire
      this.service.find(+id).subscribe(result => {
        this.playlist = result;
        this.form.patchValue(this.playlist);
      });
    }
  }


  handleSubmit() {

    const data = {
      ... this.form.value
    }

    if (this.playlist && this.playlist.id !== null) {
      data.id = this.playlist.id
      if (typeof data.tags[0] !== "string") {
        data.tags = data.tags.map(tag => "/api/tags/" + tag.id);
      }
      else {
        data.tags = data.tags.map(tag => "/api/tags/" + tag);
      }

      this.service.update(data).subscribe(result => {
        this.router.navigateByUrl("/playlist/" + this.playlist.id);
      })
    } else {

      data.tags = data.tags.map(id => "/api/tags/" + id);

      this.service.add(data).subscribe(resultat => {
        console.log(resultat);
        this.router.navigateByUrl("/playlist/" + resultat.id);
      })
    }
  }

}
