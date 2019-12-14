import { Observable, Subject } from 'rxjs';
import { Credentials } from './models/credentials';
import { User } from './models/user';

export interface AuthServiceInterface {

  authChanged: Subject<boolean>;

  login(credentials: Credentials): Observable<User>;

  logout(): Observable<any>;

  getUser(): User;

  isAuthenticated(): boolean;
}
