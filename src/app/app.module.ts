import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { credentialsInterceptor } from './authentication/regular-auth/credentials.interceptor';
import { RegularAuthService } from './authentication/regular-auth/auth.service';
import { AUTH_SERVICE } from './authentication/auth.injection';
import { RegularAuthModule } from './authentication/regular-auth/regular-auth.module';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { SongFormComponent } from './song-form/song-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    UserFormComponent,
    UserProfileComponent,
    UsersListComponent,
    PlaylistFormComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    SongFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegularAuthModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: credentialsInterceptor, multi: true },
  { provide: AUTH_SERVICE, useClass: RegularAuthService, deps: [HttpClient] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
