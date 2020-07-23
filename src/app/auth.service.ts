import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { AvatarService } from './avatar.service';
import { GetUserDto } from './models/user';
import { handleError, handleErrorAndRethrow } from './error-handler';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUri = environment.apiUrl+'/users';
  token;
 
  constructor(
    private http: HttpClient,
    private avatarService: AvatarService,
    private socialAuthService: SocialAuthService, 
    ) {
      if (this.isLogin()) this.renewCurrentUser();
    }

    private currentUser = new BehaviorSubject<GetUserDto>(null);
    currentUser$: Observable<GetUserDto> = this.currentUser.asObservable(); 
    
    signinWithGoogle() {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser=>{
        this.http.put<void>(environment.apiUrl + '/auth/google/tokensignin', socialUser.idToken, {observe:'response'}).pipe(
          tap(resp=>{localStorage.setItem('auth_token', resp.headers.get('Authorization'));
          this.renewCurrentUser();})
        ).subscribe(null,error=> {console.error(error);  alert (`Error: ${error}`)})
      })
    }

    login(email: string, password: string) : Observable<HttpResponse<void>> { 
    return this.http.post<void>(environment.apiUrl + '/signin', {login: email, password: password}, {observe:'response'})
    .pipe(
      tap((resp: HttpResponse<void>)=>{
        localStorage.setItem('auth_token', resp.headers.get('Authorization'));
        this.renewCurrentUser();
    }));
    }

  signup(name:string, email: string, password: string, avatar: File) : Observable<HttpResponse<void>>{ 
    return this.http.post<GetUserDto>(this.usersUri + '/signup', {name: name, login: email, password: password})
    .pipe(mergeMap((resp: GetUserDto)=>{
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

    renewCurrentUser(): Observable<GetUserDto>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth_token') 
        })
      };
      this.http.get<GetUserDto>(environment.apiUrl+'/users/current', httpOptions).subscribe(user=>{this.currentUser.next(user)});
      return this.currentUser$;
    } 

}
