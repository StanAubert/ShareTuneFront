import { Injectable } from "@angular/core";
import { User } from "./Models/User";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<User>("http://localhost:3500/api/users", user, { withCredentials: true });
  }

  find(id: number) {
    return this.http.get<User>("http://localhost:3500/api/users/" + id, { withCredentials: true }
    );
  }


  all() {
    return this.http.get<User>("http://localhost:3500/api/users", { withCredentials: true }
    );
  }
}
