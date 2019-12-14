import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { User } from "../Models/User";
import { Router } from '@angular/router';

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmation: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    profilePicture: new FormControl("")
  });


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }



  handleSubmit() {
    const user: User = this.form.value;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.register(user).subscribe(rep => {
        this.router.navigateByUrl("/login");
      });

    }
    return;
  }
}
