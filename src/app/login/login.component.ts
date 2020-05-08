import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { 
    this.loginForm=formBuilder.group({
      'login' : '',
      'password' : ''
    })
  }

  ngOnInit() {
  }

  login(authInfo){
    this.authService.login(authInfo.login, authInfo.password).
    subscribe(resp=> this.router.navigate(['']));
  }

}
