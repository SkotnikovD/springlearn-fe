import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private postService : PostService,
  ) { }

  posts : Observable<Post[]>;

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.posts = this.postService.getPosts();
  }
}
