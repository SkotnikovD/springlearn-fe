import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
