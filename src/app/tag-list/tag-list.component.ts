import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "../playlist.service";
import { Tag } from "../Models/Tag";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tag-list",
  templateUrl: "./tag-list.component.html",
  styleUrls: ["./tag-list.component.css"]
})
export class TagListComponent implements OnInit {
  loading = false;

  tag: Tag;

  constructor(
    private service: PlaylistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");

    this.service.findTag(id).subscribe(result => {
      this.loading = true;
      this.tag = result;
    });
  }
}
