import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  currentUser$: Observable<User>;
  
  constructor(
    private authService: AuthService,
  ) { 
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // this.currentUser$ = this.authService.currentUser$;
  }

  isLogin():boolean{
    return this.authService.isLogin();
  }

  logout(){
    this.authService.logout();
  }

}
