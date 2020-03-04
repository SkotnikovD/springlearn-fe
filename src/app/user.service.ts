import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser=null; 

  
constructor(
  private http: HttpClient,
  private authService: AuthService,
  ){ 

    this.authService.authToken.subscribe(authToken =>
      {
        if(authToken==null){
          this.currentUser = null;
        } else{
          this.getCurrentUser();
        }
      }); 

  }

getCurrentUser(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth_token') 
    })
  };
  this.http.get('http://localhost:8080/api/users/current', httpOptions).subscribe(user=>this.currentUser=user);
}  
}
