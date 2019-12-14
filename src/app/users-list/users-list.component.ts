import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit() {

    this.service.all().subscribe(result => {
      console.log(result);
    })
  }

}
