import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

constructor(
  private http: HttpClient,
  private authService: AuthService,
) { 
  this.refreshPosts();
}

posts;

refreshPosts() {
  return this.http.get('http://localhost:8080/api/posts').subscribe(posts=>this.posts=posts);
}

createPost(post){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationToken()
    })
  };
  this.http.post('http://localhost:8080/api/posts', post, httpOptions).subscribe(id=>this.refreshPosts());
}

}

