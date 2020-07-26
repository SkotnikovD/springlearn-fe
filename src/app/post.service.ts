import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

getPosts(lastId : number, pageSize: number): Observable<PostWithAuthor[]> {
  let params = new HttpParams();
  params = params.append("pageSize", pageSize.toString());
  if(lastId!=null){
    params = params.append("lastId", lastId.toString());
  }

  return this.http.get<PostWithAuthor[]>(this.postsUrl, {params: params})
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

