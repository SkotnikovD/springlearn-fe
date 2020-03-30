import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User; 

  
constructor(
  private http: HttpClient,
  private authService: AuthService,
  ){ 

    this.authService.authToken.subscribe(authToken =>
      {
        if(authToken==null){
          this.currentUser = null;
        } else{
          this.renewCurrentUser();
        }
      }); 

  }

private renewCurrentUser(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('auth_token') 
    })
  };
  this.http.get<User>(environment.apiUrl+'/current', httpOptions).subscribe(user=>this.currentUser=user);
} 

getCurrentUser(): User{
  return this.currentUser
}

}
