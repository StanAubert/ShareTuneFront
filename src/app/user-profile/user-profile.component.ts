import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../Models/User";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  form = new FormGroup({
    search: new FormControl()
  });

  user: User;
  userLocal;
  loading = false;
  search = "";
  defaultImage = "http://placehold.it/400x400";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: UserService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.userLocal = JSON.parse(localStorage.getItem("user"));
    this.service.find(id).subscribe(profile => {
      this.user = profile;
      this.loading = true;
    });
  }
}
