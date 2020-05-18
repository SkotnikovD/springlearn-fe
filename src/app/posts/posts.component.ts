import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PostWithAuthor } from '../models/post';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  currentUser$: Observable<User>;
  
  constructor(
    private postService : PostService,
    private authService : AuthService,
  ) { 
    this.currentUser$ = this.authService.currentUser$;
  }

  posts : Observable<PostWithAuthor[]>;

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

  deletePost(post: PostWithAuthor): void{
    this.postService.deletePost(post.postId).subscribe(undef=>this.posts = this.postService.getPosts())
  }
}
