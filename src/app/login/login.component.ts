import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      'login' : [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      'password' : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  ngOnInit() {
  }

  doLogin(authInfo){
    this.authService.login(authInfo.login, authInfo.password).
    subscribe(resp=> this.router.navigate(['']),
    error=>{ if(error.status==401){ 
        alert("Incorrect login or password")}
      else{
        console.error(error);
        alert(`Login failed. Reason: ${error.error?.clientMessage}`)}
    });
  }

  get login() { return this.loginForm.get('login'); }

  get password() { return this.loginForm.get('password'); }


}
