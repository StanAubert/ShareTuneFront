import { Component, OnInit, Input, Inject } from '@angular/core';
import { AUTH_SERVICE } from '../authentication/auth.injection';
import { AuthServiceInterface } from '../authentication/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = JSON.parse(window.localStorage.getItem('user'));

  isAuthenticated = false
  constructor(@Inject(AUTH_SERVICE) private auth: AuthServiceInterface, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.auth.authChanged.subscribe(status => this.isAuthenticated = status)
  }

  handleLogout() {
    this.auth.logout().subscribe(result => {
      this.router.navigateByUrl("/login");
    })
  }
}
