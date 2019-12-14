import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./login-form/login-form.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './authentication/auth.guard';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { SongFormComponent } from './song-form/song-form.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent
  },
  {
    path: "register",
    component: UserFormComponent
  },
  {
    path: "account/:id",
    component: UserProfileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "playlist/:id/add",
    component: SongFormComponent
  },
  {
    path: "account/:id/playlists",
    component: PlaylistListComponent
  },
  {
    path: "users",
    component: UsersListComponent
  },
  {
    path: "playlist/new",
    component: PlaylistFormComponent
  },
  {
    path: "playlist/:id/edit",
    component: PlaylistFormComponent
  },
  {
    path: "playlist/:id",
    component: PlaylistDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
