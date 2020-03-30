import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUri = environment.apiUrl+'/users';
  token;
 
  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

    private authTokenSource = new BehaviorSubject(localStorage.getItem('auth_token'));
    authToken = this.authTokenSource.asObservable();

  login(email: string, password: string) {
    this.http.post(environment.apiUrl + '/signin', {login: email, password: password}, {observe:'response'})
    .subscribe((resp: any) => {
      localStorage.setItem('auth_token', resp.headers.get('Authorization'));
      this.authTokenSource.next(localStorage.getItem('auth_token'));
      // this.userService.getCurrentUser().subscribe((resp: any) => {
      //   console.log(resp);
      //   this.authorisedUserSource.next(resp);})
      this.router.navigate(['']);
      })
    }

  signup(name:string, email: string, password: string){
    this.http.post(this.usersUri + '/signup', {name: name, login: email, password: password}) 
    .subscribe((resp: any) => {
      this.login(email, password);
      })
  }

    logout() {
      localStorage.removeItem('auth_token');
      this.authTokenSource.next(null);
    }
   
    public isLogin(): boolean {
      return (localStorage.getItem('auth_token') !== null);
      // return !this.authTokenSource.getValue==null
    }

    getAuthorizationToken(): string{
     return this.authTokenSource.value;
    }
}
