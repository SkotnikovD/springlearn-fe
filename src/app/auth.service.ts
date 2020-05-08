import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { tap, map, mergeMap } from 'rxjs/operators';
import { AvatarService } from './avatar.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUri = environment.apiUrl+'/users';
  token;
 
  constructor(
    private http: HttpClient,
    private avatarService: AvatarService, 
    ) {
      if (this.isLogin()) this.renewCurrentUser();
    }

    private currentUser = new BehaviorSubject<User>(null);
    currentUser$: Observable<User> = this.currentUser.asObservable(); 

    login(email: string, password: string) : Observable<HttpResponse<void>> { 
    return this.http.post<void>(environment.apiUrl + '/signin', {login: email, password: password}, {observe:'response'})
    .pipe(tap((resp: HttpResponse<void>)=>{
      localStorage.setItem('auth_token', resp.headers.get('Authorization'));
      this.renewCurrentUser();
    }));
    }

  signup(name:string, email: string, password: string, avatar: File) : Observable<HttpResponse<void>>{ 
    return this.http.post<User>(this.usersUri + '/signup', {name: name, login: email, password: password})
    .pipe(mergeMap((resp: User)=>{
      var loginResp: Observable<HttpResponse<void>> = this.login(email, password).pipe(tap(()=>{if (avatar) this.avatarService.uploadAvatar(avatar).subscribe(avatarUploaded=>this.renewCurrentUser())}))
      //loginResp.subscribe(()=>{if (avatar) this.avatarService.uploadAvatar(avatar).subscribe(avatarUploaded=>this.renewCurrentUser())});
      return loginResp;
    }))
  }

    logout(): void {
      localStorage.removeItem('auth_token');
      this.currentUser.next(null);
    }
   
    isLogin(): boolean {
      return (localStorage.getItem('auth_token') !== null);
    }

    getAuthorizationToken(): string{
     return localStorage.getItem('auth_token')
    }

    renewCurrentUser(): Observable<User>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth_token') 
        })
      };
      this.http.get<User>(environment.apiUrl+'/users/current', httpOptions).subscribe(user=>this.currentUser.next(user));
      return this.currentUser$;
    } 

}
