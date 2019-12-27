import { Component, OnInit, EventEmitter, Output, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../Models/User";
import { AUTH_SERVICE } from "../authentication/auth.injection";
import { AuthServiceInterface } from "../authentication/auth.interface";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loading = false;

  hasError: boolean;

  form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface,
    private router: Router
  ) {}

  ngOnInit() {}

  handleSubmit() {
    this.form.markAllAsTouched();
    this.hasError = false;
    if (this.form.invalid) {
      return;
    }
    this.auth.login(this.form.value).subscribe(
      resultat => {
        // console.log(resultat);

        this.router.navigateByUrl("/account/" + resultat["id"]);
      },
      (httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          this.hasError = true;
          return;
        }

        console.log(httpError);
      }
    );
  }
}
