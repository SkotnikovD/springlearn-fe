import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PostWithAuthor } from './models/post';
import { environment } from './../environments/environment';
import { handleError, handleErrorAndRethrow } from './error-handler';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = environment.apiUrl+'/posts';

constructor(
  private http: HttpClient,
  private authService: AuthService,
) { 
}

getPosts(): Observable<PostWithAuthor[]> {
  return this.http.get<PostWithAuthor[]>(this.postsUrl)
  .pipe(
    // catchError(handleError<PostWithAuthor[]>([]))
  );
}

createPost(post: PostWithAuthor): Observable<number>{
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationToken()
    })
  }; 
  return this.http.post<number>(this.postsUrl, post, httpOptions)
  .pipe(
    // catchError(handleErrorAndRethrow())
  );
}

deletePost(postId: number): Observable<void>{
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationToken()
    })
  }; 
  return this.http.delete<void>(this.postsUrl+'/'+postId, httpOptions)
  .pipe(
    // catchError(handleError<void>(null))
    );
}
}

