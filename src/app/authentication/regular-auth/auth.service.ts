import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceInterface } from '../auth.interface';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { RegularAuthModule } from './regular-auth.module';



@Injectable(
  { providedIn: RegularAuthModule }
)
export class RegularAuthService implements AuthServiceInterface {
  // sujet qui emet un evenement à la connexion (true) et deconnexion (false)
  authChanged = new Subject<boolean>();
  // user: User = null;

  constructor(private http: HttpClient) { }

  // Recupere la donnée user dans le local storage
  getUser(): User {
    return JSON.parse(window.localStorage.getItem('user'));
  }
  // requete l'api avec email et mot de passe et intercepte le resultat pour stocker l'utilisateur dans le localstorage et activé le sujet authchanged pour annocer a tout
  // le monde qu'on est connecté (true)
  login(credentials: Credentials) {

    return this.http.post("http://localhost:3500/api/login", credentials).pipe(

      map((resultat: any) => {
        // on previen ceux que ça interesse qu'on est connecté (navbar)
        this.authChanged.next(true);
        // on stock l'user dans le local storage
        window.localStorage.setItem('user', JSON.stringify(resultat));
        // on retourne les données du user
        return resultat;
      })
    );

  }
  // requete l'api pour se deconnecter et intercepte le resultat pour nettoyer le localstorge et prevenir tout le monde qu'on est deconnecté (false)
  logout() {
    return this.http.get("http://localhost:3500/api/logout").pipe(
      map(result => {
        // on nettoie le local storage
        window.localStorage.removeItem('user');
        // on previens ceux que ça interesse qu'on est deconnecté
        this.authChanged.next(false);
        // on retourne le resultat
        return result;
      })
    );

  }

  isAuthenticated() {
    return this.getUser() !== null;
  }
}
