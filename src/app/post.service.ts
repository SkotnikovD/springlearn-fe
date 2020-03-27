import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'http://localhost:8080/api/posts';

constructor(
  private http: HttpClient,
  private authService: AuthService,
) { 
}

newPostAdded: Subject<number> = new Subject<number>();

getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(this.postsUrl)
  .pipe(
    catchError(this.handleError<Post[]>('getPosts', []))
    )
}

createPost(post: Post): Observable<number>{
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationToken()
    })
  }; 
  let res = this.http.post<number>(this.postsUrl, post, httpOptions)
  .pipe(
    catchError(this.handleError<number>('createPost', null))
    );
  res.subscribe(id=>this.newPostAdded.next(id));
  return res;
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); 

    alert(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}

