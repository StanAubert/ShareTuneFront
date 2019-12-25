import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlaylistService } from "../playlist.service";
import { Tag } from "../Models/Tag";
import { User } from "../authentication/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { Playlist } from "../Models/Playlist";

@Component({
  selector: "app-playlist-form",
  templateUrl: "./playlist-form.component.html",
  styleUrls: ["./playlist-form.component.css"]
})
export class PlaylistFormComponent implements OnInit {
  tags: Tag[];
  loading = false;
  playlist: Playlist;

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    decription: new FormControl("", Validators.required),
    tags: new FormControl()
  });

  tagArray: number[] = [];

  constructor(
    private service: PlaylistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.allTags().subscribe(tags => {
      this.tags = tags;
    });

    // on verifie l'id dans l'url
    const id = this.route.snapshot.paramMap.get("id");
    // si il y a un identfiant
    if (id) {
      // on va chercher la playlist à modifier et on applique les données au formulaire
      this.service.find(+id).subscribe(result => {
        this.loading = true;
        this.playlist = result;
        this.form.patchValue(this.playlist);
        this.form.value.tags = this.form.value.tags.map(tag => `${tag.id}`);
        this.form.value.tags.forEach(tag => {
          this.tagArray.push(tag);
        });
      });
    } else {
      this.loading = true;
    }
  }

  handleSubmit() {
    const data = {
      ...this.form.value
    };

    if (this.playlist && this.playlist.id !== null) {
      data.id = this.playlist.id;

      data.tags = this.tagArray;

      this.tagArray.forEach(tag => {
        if (!data.tags.includes(tag)) {
          data.tags.push(tag);
        }
      });

      if (typeof data.tags[0] !== "string") {
        data.tags = data.tags.map(tag => "/api/tags/" + tag.id);
      } else {
        data.tags = data.tags.map(tag => "/api/tags/" + tag);
      }

      this.service.update(data).subscribe(result => {
        this.router.navigateByUrl("/playlist/" + this.playlist.id);
      });
    } else {
      data.tags = this.tagArray;

      data.tags = data.tags.map(id => "/api/tags/" + id);

      this.service.add(data).subscribe(resultat => {
        this.router.navigateByUrl("/playlist/" + resultat.id);
      });
    }
  }

  toggleTag(tagId) {
    tagId = `${tagId}`;
    if (this.tagArray.includes(tagId)) {
      this.tagArray.splice(this.tagArray.indexOf(tagId), 1);

      return false;
    } else {
      this.tagArray.push(tagId);

      return true;
    }
  }

  isInTagArray(id) {
    id = `${id}`;
    if (this.tagArray.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
