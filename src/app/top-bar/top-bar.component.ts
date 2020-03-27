import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  isLogin():boolean{
    return this.authService.isLogin();
  }

  logout(){
    this.authService.logout();
  }

}
