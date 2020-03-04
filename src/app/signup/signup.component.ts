import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm; 

  constructor(private formBuilder: FormBuilder,
    private authService : AuthService,) { 
    this.signupForm=formBuilder.group({
      'name' : '',
      'login' : '',
      'password' : '',
    })
  }

  ngOnInit() {
  }

  signup(signupInfo){
    this.authService.signup(signupInfo.name, signupInfo.login, signupInfo.password);
  }

}
