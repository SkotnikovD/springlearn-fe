import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { 
    this.loginForm=formBuilder.group({
      'login' : '',
      'password' : ''
    })
  }

  ngOnInit() {
  }

  login(authInfo){
    this.authService.login(authInfo.login, authInfo.password);
  }

}
