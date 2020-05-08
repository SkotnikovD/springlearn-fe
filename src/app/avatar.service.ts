import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

constructor( private http: HttpClient,) { }

uploadAvatar(file: File) : Observable<HttpResponse<Object>>{
  const formData = new FormData();
  formData.append('image', file);

  let httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/data-form',
      'Authorization': localStorage.getItem('auth_token') 
    })
  };
  return this.http.post<any>(environment.apiUrl+'/users/current/avatar', formData, httpOptions);
}

}
