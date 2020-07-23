import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetUserDto } from './models/user';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(
  private http: HttpClient,
  private authService: AuthService,
  ){ 
  }

}
